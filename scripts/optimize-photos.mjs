#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultInputDir = path.join(__dirname, "..", "public", "photography");
const defaultOutputDir = defaultInputDir;

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG"]);

const parseArgs = rawArgs => {
  const args = {
    input: defaultInputDir,
    output: defaultOutputDir,
    quality: 80,
    maxSize: 1920,
    dryRun: false,
  };

  for (let i = 2; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];

    switch (arg) {
      case "--input":
      case "-i":
        args.input = rawArgs[i + 1] ? path.resolve(rawArgs[i + 1]) : args.input;
        i += 1;
        break;
      case "--output":
      case "-o":
        args.output = rawArgs[i + 1] ? path.resolve(rawArgs[i + 1]) : args.output;
        i += 1;
        break;
      case "--quality":
      case "-q":
        args.quality = Number.parseInt(rawArgs[i + 1], 10) || args.quality;
        i += 1;
        break;
      case "--max":
      case "-m":
        args.maxSize = Number.parseInt(rawArgs[i + 1], 10) || args.maxSize;
        i += 1;
        break;
      case "--dry-run":
        args.dryRun = true;
        break;
      default:
        break;
    }
  }

  return args;
};

const ensureDirectory = async dir => fs.mkdir(dir, { recursive: true });

const walk = async dir => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return fullPath;
    })
  );
  return files.flat();
};

const formatBytes = bytes => {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** index).toFixed(2)} ${units[index]}`;
};

const optimiseImage = async ({
  inputPath,
  outputPath,
  quality,
  maxSize,
  dryRun,
}) => {
  const originalBuffer = await fs.readFile(inputPath);
  const image = sharp(originalBuffer, { failOn: "none" }).rotate();
  const metadata = await image.metadata();

  const resized = image.resize({
    width: maxSize,
    height: maxSize,
    fit: "inside",
    withoutEnlargement: true,
  });

  const extension = path.extname(inputPath).toLowerCase();

  if (extension === ".png") {
    resized.png({ quality, compressionLevel: 9, adaptiveFiltering: true });
  } else if (extension === ".webp") {
    resized.webp({ quality, effort: 6 });
  } else {
    resized.jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:4:4" });
  }

  const optimisedBuffer = await resized.toBuffer();
  const savedBytes = originalBuffer.length - optimisedBuffer.length;

  if (dryRun) {
    return {
      processed: false,
      savedBytes,
      originalBytes: originalBuffer.length,
      metadata,
      outputSkipped: true,
    };
  }

  await ensureDirectory(path.dirname(outputPath));

  if (savedBytes <= 1024 && metadata.width <= maxSize && metadata.height <= maxSize) {
    // Skip rewriting when there is negligible benefit.
    return {
      processed: false,
      savedBytes,
      originalBytes: originalBuffer.length,
      metadata,
      outputSkipped: true,
    };
  }

  await fs.writeFile(outputPath, optimisedBuffer);

  return {
    processed: true,
    savedBytes,
    originalBytes: originalBuffer.length,
    metadata,
    outputSkipped: false,
  };
};

const main = async () => {
  const { input, output, quality, maxSize, dryRun } = parseArgs(process.argv);

  try {
    await ensureDirectory(output);
  } catch (error) {
    console.error(`Could not create output directory: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  const files = (await walk(input)).filter(file => SUPPORTED_EXTENSIONS.has(path.extname(file)));
  if (!files.length) {
    console.log(`No image files found in ${input}`);
    return;
  }

  let processedCount = 0;
  let skippedCount = 0;
  let totalSaved = 0;
  let totalOriginal = 0;

  console.log(`Optimising ${files.length} image${files.length === 1 ? "" : "s"}...`);
  console.log(`Max dimension: ${maxSize}px | Quality: ${quality} | Dry run: ${dryRun ? "yes" : "no"}`);

  for (const filePath of files) {
    const relative = path.relative(input, filePath);
    const outputPath = path.join(output, relative);

    try {
      const { processed, savedBytes, originalBytes, outputSkipped } = await optimiseImage({
        inputPath: filePath,
        outputPath,
        quality,
        maxSize,
        dryRun,
      });

      totalOriginal += originalBytes;
      totalSaved += Math.max(savedBytes, 0);

      if (processed) {
        processedCount += 1;
        console.log(`✓ ${relative} (${formatBytes(originalBytes)} → ${formatBytes(originalBytes - savedBytes)})`);
      } else {
        skippedCount += 1;
        const reason = outputSkipped ? "no significant savings" : "up-to-date";
        console.log(`• Skipped ${relative} (${reason})`);
      }
    } catch (error) {
      skippedCount += 1;
      console.error(`✗ Failed ${relative}: ${error.message}`);
    }
  }

  const summaryLines = [
    "\nSummary:",
    `  Processed: ${processedCount}`,
    `  Skipped:   ${skippedCount}`,
    `  Saved:     ${formatBytes(totalSaved)} (from ${formatBytes(totalOriginal)})`,
  ];

  console.log(summaryLines.join("\n"));
};

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
