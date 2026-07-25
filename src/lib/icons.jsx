import {
  FaGithub,
  FaLinkedinIn,
  FaMedium,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {
  FiMail,
  FiFileText,
  FiEdit3,
  FiBookOpen,
  FiTool,
  FiMic,
  FiCpu,
  FiLink,
} from "react-icons/fi";

// Social platform -> icon component
export const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  medium: FaMedium,
  x: FaXTwitter,
  mail: FiMail,
};

// Lab entry type -> { icon, label, accent color }
export const labTypes = {
  youtube: { icon: FaYoutube, label: "YouTube", color: "#ff4d4f" },
  ieee: { icon: FiCpu, label: "IEEE", color: "#2f74c0" },
  paper: { icon: FiFileText, label: "Paper", color: "#a78bfa" },
  blog: { icon: FiEdit3, label: "Blog", color: "#38bdf8" },
  course: { icon: FiBookOpen, label: "Course", color: "#f59e0b" },
  tool: { icon: FiTool, label: "Tool", color: "#22c55e" },
  podcast: { icon: FiMic, label: "Podcast", color: "#ec4899" },
  default: { icon: FiLink, label: "Link", color: "#94a3b8" },
};

export function getLabType(type) {
  return labTypes[type] || labTypes.default;
}
