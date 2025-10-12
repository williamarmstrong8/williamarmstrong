import * as React from "react";

const MOBILE_BREAKPOINT = 1024;

export function useIsMobile() {
  // Initialize from current window width to avoid a wrong first render on mobile
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // Set immediately from media query match to ensure consistency
    setIsMobile(mql.matches);

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // Safari fallback
      // @ts-ignore
      mql.addListener(onChange);
      return () => {
        // @ts-ignore
        mql.removeListener(onChange);
      };
    }
  }, []);

  return isMobile;
}
