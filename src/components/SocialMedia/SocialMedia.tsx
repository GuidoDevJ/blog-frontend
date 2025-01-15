'use client';
import Image from "next/image";
import Link from "next/link";

const icons = [
  {
    href: "https://linkedin.com/",
    light: "/icon _linkedin_.svg",
    dark: "/icon _linkedin_dark_mode.svg",
    alt: "LinkedIn Icon",
  },
  {
    href: "https://instagram.com/",
    light: "/icon _instagram fill icon_.svg",
    dark: "/icon _instagram_dark_mode.svg",
    alt: "Instagram Icon",
  },
  {
    href: "https://tiktok.com/",
    light: "/icon _tiktok_.svg",
    dark: "/icon _tiktok_dark_mode.svg",
    alt: "TikTok Icon",
  },
  {
    href: "https://github.com/",
    light: "/icon _github.svg",
    dark: "/icon _github_dark_mode.svg",
    alt: "GitHub Icon",
  },
];

const SocialMedia = () => {
  return (
    <div className="w-auto h-auto flex items-center gap-2 mt-8">
      {icons.map(({ href, light, dark, alt }) => (
        <Link key={href} href={href} target="_blank" rel="noopener noreferrer">
          <Image
            src={light}
            alt={alt}
            width={16}
            height={16}
            className="dark:hidden"
          />
          <Image
            src={dark}
            alt={alt}
            width={16}
            height={16}
            className="hidden dark:inline"
          />
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
