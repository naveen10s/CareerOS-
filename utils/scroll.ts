/**
 * Locks main document scrolling.
 */
export function lockScroll() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
  }
}

/**
 * Restores main document scrolling.
 */
export function unlockScroll() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "unset";
  }
}

/**
 * Instantly scrolls window to coordinates.
 */
export function scrollToTop(smooth = true) {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }
}
