"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <footer className="global-footer bg-background py-16 text-foreground transition-colors duration-300 border-t border-border/50">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-6 md:gap-10">
          {/* Logo */}
          <Link href="/" className="inline-block transition-opacity hover:opacity-80" aria-label="4HumAI - Home">
            <span 
              className="inline-block transition-all duration-300"
              style={{ filter: mounted && theme === 'light' ? 'invert(1)' : 'none' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/horizontal-logo.svg"
                alt="4HumAI Logo"
                className="h-10 w-auto"
              />
            </span>
          </Link>

          {/* Mission Statement */}
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground/80 max-w-2xl mx-auto font-medium text-justify md:text-center">
            Empowering storytellers and studios worldwide with ethical, human-centered AI tools 
            that elevate creativity and bring great stories to every screen and language.
          </p>

          {/* Contact Section with Separator */}
          <div className="w-full border-t border-border/40 pt-8 flex flex-col items-center gap-2">
             <div className="flex flex-col md:flex-row items-center justify-center gap-1 text-sm text-muted-foreground">
                <p>2 Nguyen Thanh Son, Thu Duc City, Ho Chi Minh City, Vietnam</p>
             </div>
             
             <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground/70">Email:</span>
                <a href="mailto:hello@4hum.ai" className="hover:text-foreground transition-colors font-medium">
                  hello@4hum.ai
                </a>
                
                <span className="text-border/50">|</span>

                <a
                  href="https://www.linkedin.com/company/ai-for-humanity-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center"
                  aria-label="LinkedIn"
                >
                   <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
             </div>

             {/* Copyright - Closer to contact info */}
             <div className="text-sm text-muted-foreground/80 font-medium mt-2">
               &copy; 2025 AI For Humanity Labs, Inc. All rights reserved.
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
