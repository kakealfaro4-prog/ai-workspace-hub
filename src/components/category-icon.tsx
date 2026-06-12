import {
  AudioLines,
  BarChart3,
  Bot,
  Briefcase,
  Camera,
  Clapperboard,
  Cloud,
  Code2,
  Globe,
  Image,
  Mail,
  Megaphone,
  MessageCircle,
  Music,
  Palette,
  PenLine,
  Search,
  Share2,
  ShieldCheck,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/types/tool";

const ICONS: Record<IconName, LucideIcon> = {
  Bot,
  Code2,
  PenLine,
  Search,
  Image,
  Clapperboard,
  AudioLines,
  Music,
  Camera,
  Palette,
  Globe,
  Share2,
  Megaphone,
  Mail,
  MessageCircle,
  Zap,
  Workflow,
  BarChart3,
  Cloud,
  ShieldCheck,
  Users,
  Briefcase,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden />;
}
