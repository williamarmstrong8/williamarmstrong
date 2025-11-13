import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import "./Masonry.css";

const easeMap: Record<string, number[]> = {
  "power3.out": [0.22, 1, 0.36, 1],
  "power2.out": [0.2, 0.65, 0.3, 1],
  "power1.out": [0.17, 0.67, 0.4, 0.93],
  "ease.out": [0.22, 1, 0.36, 1],
};

const getEase = (ease: string) => easeMap[ease] ?? easeMap["power3.out"];

const encodePathname = (input: string) => {
  try {
    if (typeof window === "undefined") return input;
    const url = new URL(input, window.location.origin);
    url.pathname = url.pathname
      .split("/")
      .map(segment => encodeURIComponent(decodeURIComponent(segment)))
      .join("/");
    return url.href;
  } catch {
    return input;
  }
};

const normalizeSrc = (src: string) => encodePathname(src);

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const getValue = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue());
    queries.forEach(q => matchMedia(q).addEventListener("change", handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener("change", handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<Record<string, { width: number; height: number }>> => {
  const results = await Promise.all(
    urls.map(src =>
      new Promise<{ key: string; width: number; height: number }>(resolve => {
        const normalized = normalizeSrc(src);
        const img = new Image();
        img.src = normalized;
        img.onload = () => resolve({ key: normalized, width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => resolve({ key: normalized, width: 0, height: 0 });
      })
    )
  );

  return results.reduce<Record<string, { width: number; height: number }>>((acc, { key, width, height }) => {
    acc[key] = { width, height };
    return acc;
  }, {});
};

export interface Item {
  id: string;
  img: string;
  url?: string;
  height?: number;
  title?: string;
  data?: Record<string, unknown>;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onItemClick?: (item: Item) => void;
}

const GAP = 24;

const getInitialPosition = (
  item: GridItem,
  animateFrom: MasonryProps["animateFrom"],
  container: DOMRect | undefined
) => {
  if (!container) return { x: item.x, y: item.y };

  let direction = animateFrom;

  if (direction === "random") {
    const directions = ["top", "bottom", "left", "right"] as const;
    direction = directions[Math.floor(Math.random() * directions.length)];
  }

  switch (direction) {
    case "top":
      return { x: item.x, y: -200 };
    case "bottom":
      return { x: item.x, y: container.height + 200 };
    case "left":
      return { x: -200, y: item.y };
    case "right":
      return { x: container.width + 200, y: item.y };
    case "center":
      return {
        x: container.width / 2 - item.w / 2,
        y: container.height / 2 - item.h / 2,
      };
    default:
      return { x: item.x, y: item.y + 120 };
  }
};

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick,
}) => {
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:600px)", "(min-width:400px)"],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hasMounted = useRef(false);
  const [imageMeta, setImageMeta] = useState<Record<string, { width: number; height: number }>>({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!items.length) {
      setImagesReady(true);
      return;
    }

    let cancelled = false;
    if (isInitialLoad) {
      setImagesReady(false);
    }

    preloadImages(items.map(i => i.img)).then(meta => {
      if (cancelled) return;
      setImageMeta(prev => ({ ...prev, ...meta }));
      setImagesReady(true);
      setIsInitialLoad(false);
    });

    return () => {
      cancelled = true;
    };
  }, [items, isInitialLoad]);

  const { grid, height: gridHeight } = useMemo(() => {
    if (!width || !columns || !imagesReady) {
      return { grid: [] as GridItem[], height: 0 };
    }

    const columnWidth = columns > 1 ? (width - GAP * (columns - 1)) / columns : width;
    const colHeights = Array.from({ length: columns }, () => 0);

    const positionedItems = items.map<GridItem>(item => {
      const shortestColumn = colHeights.indexOf(Math.min(...colHeights));
      const x = shortestColumn * (columnWidth + GAP);

      const normalizedSrc = normalizeSrc(item.img);
      const meta = imageMeta[normalizedSrc];
      const aspectRatio = meta && meta.width ? meta.height / meta.width : undefined;
      const derivedHeight = aspectRatio ? columnWidth * aspectRatio : item.height ?? columnWidth * 0.75;
      const height = Number.isFinite(derivedHeight) ? derivedHeight : columnWidth * 0.75;
      const y = colHeights[shortestColumn];

      colHeights[shortestColumn] += height + GAP;

      return {
        ...item,
        x,
        y,
        w: columnWidth,
        h: height,
      };
    });

    const calculatedHeight = Math.max(0, Math.max(...colHeights) - GAP);

    return {
      grid: positionedItems,
      height: calculatedHeight,
    };
  }, [columns, imageMeta, imagesReady, items, width]);

  useLayoutEffect(() => {
    if (imagesReady) {
      hasMounted.current = true;
    }
  }, [imagesReady]);

  const containerRect = containerRef.current?.getBoundingClientRect();
  const isInitialMount = !hasMounted.current;
  const easing = getEase(ease);

  const handleItemClick = (item: GridItem) => {
    if (onItemClick) {
      onItemClick(item);
      return;
    }

    if (item.url) {
      window.open(item.url, "_blank", "noopener");
    }
  };

  if (isInitialLoad && !imagesReady) {
    return (
      <div ref={containerRef} className="list masonry-loading">
        <div className="masonry-loading__overlay">
          <div className="masonry-loading__spinner" />
          <p>Loading gallery…</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="list" style={{ height: gridHeight }}>
      {grid.map((item, index) => {
        const initialPos = isInitialMount ? getInitialPosition(item, animateFrom, containerRect) : null;
        const delay = isInitialMount ? index * stagger : 0;

        return (
          <motion.div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            style={{ width: item.w, height: item.h }}
            initial={
              initialPos
                ? {
                    left: initialPos.x,
                    top: initialPos.y,
                    opacity: 0,
                  }
                : { opacity: 0 }
            }
            animate={{
              left: item.x,
              top: item.y,
              width: item.w,
              height: item.h,
              opacity: 1,
              scale: hoveredId === item.id && scaleOnHover ? hoverScale : 1,
            }}
            transition={{
              duration: isInitialMount ? 0.6 : duration,
              ease: easing,
              delay,
            }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(prev => (prev === item.id ? null : prev))}
            onClick={() => handleItemClick(item)}
          >
            <motion.div
              className="item-img"
              initial={isInitialMount && blurToFocus ? { filter: "blur(14px)" } : undefined}
              animate={{
                filter: blurToFocus ? "blur(0px)" : "blur(0px)",
              }}
              transition={{ duration: 0.4, ease: easing }}
            >
              <img
                src={normalizeSrc(item.img)}
                alt={item.title ?? "Gallery item"}
                loading="lazy"
                className="masonry-img"
              />
              {colorShiftOnHover && (
                <motion.div
                  className="color-overlay"
                  animate={{ opacity: hoveredId === item.id ? 0.3 : 0 }}
                  transition={{ duration: 0.3, ease: easing }}
                />
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Masonry;

