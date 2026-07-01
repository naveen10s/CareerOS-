import profileData from "./profile.json";

export interface ProfileTransition {
  whyProductManagement: string;
  transferableSkills: string[];
}

export interface Profile {
  name: string;
  headline: string;
  currentRole: string;
  targetRole: string;
  summary: string;
  avatar: string;
  email: string;
  location: string;
  strengths: string[];
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  transitionNarrative: ProfileTransition;
}

export const profile: Profile = profileData.example as Profile;
export default profile;
