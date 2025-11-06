import { InstagramIcon, FacebookIcon, GithubIcon, LinkedinIcon } from '@/components/SocialIcons';

export interface Logo {
  src: string;
  alt: string;
}

export const TECH_LOGOS_ROW_1: Logo[] = [
  { src: "/csharp.svg", alt: "C#" },
  { src: "/css.svg", alt: "CSS" },
  { src: "/django.svg", alt: "Django" },
  { src: "/flask.svg", alt: "Flask" },
  { src: "/html.svg", alt: "HTML" },
  { src: "/javascript.svg", alt: "JavaScript" },
  { src: "/jinja.svg", alt: "Jinja" },
  { src: "/mongo.svg", alt: "MongoDB" },
  { src: "/mysql.svg", alt: "MySQL" },
  { src: "/net.svg", alt: ".net" },
  { src: "/nextjs.svg", alt: "Next.js" },
];

export const TECH_LOGOS_ROW_2: Logo[] = [
  { src: "/nodejs.svg", alt: "Node.js" },
  { src: "/oracle.svg", alt: "Oracle" },
  { src: "/plsql.svg", alt: "PL/SQL" },
  { src: "/python.svg", alt: "Python" },
  { src: "/react.svg", alt: "React" },
  { src: "/scss.svg", alt: "SCSS" },
  { src: "/supabase.svg", alt: "Supabase" },
  { src: "/typescript.svg", alt: "TypeScript" },
  { src: "/vercel.svg", alt: "Vercel" },
  { src: "/vue.svg", alt: "Vue" },
  { src: "/xaml.svg", alt: "XAML" },
];

export const SOCIAL_LINKS = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/_bram.dev/', color: '#E1306C' },
  { icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61581928217793', color: '#1877F2' },
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/dev-bram', color: '#8B5CF6' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/company/developpement-bram/', color: '#0A66C2' },
];
