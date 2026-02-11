"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 50;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      setIsHidden(false);
      setIsScrolled(false);
      setLastScrollY(0);
      return;
    }

    setIsScrolled(true);

    if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300",
        isScrolled ? "backdrop-blur-xl bg-background/80" : "bg-transparent",
        isHidden ? "-translate-y-full" : "translate-y-0",
        "global-header"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between lg:h-[84px]">
          {/* Logo (Left) */}
          <div className="flex flex-1 items-center justify-start">
            <Link
              href="/"
              className="flex shrink-0 cursor-pointer items-center gap-2.5"
              aria-label="4HumAI - Home"
            >
              <span 
                className="inline-block transition-all duration-300"
                style={{ filter: mounted && theme === 'light' ? 'invert(1)' : 'none' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/horizontal-logo.svg"
                  alt="4HumAI Logo"
                  className="h-11"
                />
              </span>
            </Link>
          </div>

          {/* Search Input (Center-ish) - Hidden for now */}
          <div className="hidden lg:flex flex-[1.5] items-center justify-center px-8">
            {/* <div className="relative w-full max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search series or creators..."
                className="w-full bg-foreground/5 border-none rounded-full py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/40 focus:outline-hidden focus:ring-1 focus:ring-foreground/10 transition-all font-medium"
              />
            </div> */}
          </div>

          {/* Right Actions (Right) */}
          <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
            {/* <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-5 font-bold text-foreground/80 hover:text-foreground hover:bg-muted transition-all duration-200 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Log In
            </Button> */}

            <div className="flex items-center gap-2">
              {/* <LanguageSwitcher /> */}
              
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-foreground/70 hover:bg-muted hover:text-foreground h-9 w-9 transition-all duration-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  aria-label="Toggle theme"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button - Hidden */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button> */}
          </div>
        </div>

        {/* Mobile Navigation */}

      </div>
    </header>
  );
};

export default Header;
