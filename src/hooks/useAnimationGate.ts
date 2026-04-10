import { useEffect, useState, type RefObject } from "react";

interface AnimationGateOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useAnimationGate<T extends HTMLElement>(
  elementRef: RefObject<T | null>,
  options: AnimationGateOptions = {},
) {
  const { rootMargin = "160px 0px", threshold = 0.01 } = options;
  const [inViewport, setInViewport] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(media.matches);
    updateReducedMotion();
    media.addEventListener("change", updateReducedMotion);
    return () => media.removeEventListener("change", updateReducedMotion);
  }, []);

  useEffect(() => {
    const updatePageVisibility = () => setPageVisible(!document.hidden);
    updatePageVisibility();
    document.addEventListener("visibilitychange", updatePageVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updatePageVisibility);
  }, []);

  useEffect(() => {
    const target = elementRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { rootMargin, threshold },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [elementRef, rootMargin, threshold]);

  return {
    shouldAnimate: inViewport && pageVisible && !reducedMotion,
    reducedMotion,
    inViewport,
    pageVisible,
  };
}
