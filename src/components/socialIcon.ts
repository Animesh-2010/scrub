import { Globe, Instagram, LinkedIn, XIcon, YouTube } from "./Icons";

export const socialIcon = (name: string) => {
  switch (name) {
    case "Instagram": return Instagram;
    case "LinkedIn": return LinkedIn;
    case "YouTube": return YouTube;
    case "X": return XIcon;
    default: return Globe;
  }
};
