import { type Transition } from "framer-motion";

/**
 * Premium spring transition settings.
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 15,
  mass: 0.8,
};

/**
 * Standard hover interactive transitions.
 */
export const hoverTransition: Transition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.25,
};

/**
 * Triggers layout-guided staggered delays.
 */
export function getStaggerDelay(idx: number, baseDelay = 0.05): number {
  return idx * baseDelay;
}
