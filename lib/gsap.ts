import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins on the client side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Apply premium transition defaults
  gsap.defaults({
    ease: "power3.out",
    duration: 0.6,
  });

  // Configure ScrollTrigger defaults for smooth interactions
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });
}

export * from "gsap/ScrollTrigger";
export * from "gsap/ScrollToPlugin";
export { gsap };
export default gsap;
