import socialLinksData from "./social-links.json";

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon: string;
}

export const contact: SocialLink[] = socialLinksData.example as SocialLink[];
export default contact;
