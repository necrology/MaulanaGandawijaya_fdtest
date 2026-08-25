import {
  Atom,
  BriefcaseBusiness,
  Camera,
  Code2,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Globe,
  Globe2,
  Layers3,
  Mail,
  MessageCircle,
  Palette,
  Send,
  Server,
  Smartphone,
  Terminal,
  UserRound,
  Webhook,
} from "lucide-react";
import type { ElementType, SVGProps } from "react";

function GithubBrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" {...props}>
      <path d="M12 .3A12 12 0 0 0 8.2 23.7c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

function LinkedinBrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" {...props}>
      <path d="M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1Zm1.8 13.1H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
    </svg>
  );
}

const icons: Record<string, ElementType> = {
  Atom,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Globe,
  Globe2,
  Github: GithubBrandIcon,
  Instagram: Camera,
  Layers3,
  Linkedin: LinkedinBrandIcon,
  Mail,
  MessageCircle,
  Palette,
  Send,
  Server,
  Smartphone,
  Terminal,
  UserRound,
  Webhook,
};

type IconProps = {
  name?: string | null;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const Component = name ? icons[name] ?? Code2 : Code2;
  return <Component className={className} aria-hidden="true" />;
}
