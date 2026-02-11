"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="global-footer bg-background py-16 text-foreground transition-colors duration-300 border-t border-border/50">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Link href="/" className="inline-block transition-opacity hover:opacity-80" aria-label="4HumAI - Home">
            <span 
              className="inline-block transition-all duration-300"
              style={{ filter: mounted && theme === 'light' ? 'invert(1)' : 'none' }}
            >
              <img
                src="/horizontal-logo.svg"
                alt="4HumAI Logo"
                className="h-12 w-auto"
              />
            </span>
          </Link>

          {/* Mission Statement */}
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto font-medium">
            Empowering storytellers and studios worldwide with ethical, human-centered AI tools 
            that elevate creativity and bring great stories to every screen and language.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/company/ai-for-humanity-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
              aria-label="LinkedIn"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Minimal Copyright - Optional but usually needed */}
          <div className="mt-4 text-sm text-muted-foreground/60">
            &copy; {new Date().getFullYear()} 4HumAI Labs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
