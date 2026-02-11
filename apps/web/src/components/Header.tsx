"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 50;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        isScrolled ? "backdrop-blur-xl bg-background/80 border-b border-border/50" : "bg-transparent",
        isHidden ? "-translate-y-full" : "translate-y-0"
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
              <Image
                src="/horizontal-logo.svg"
                alt="4HumAI Logo"
                width={129}
                height={44}
                className="h-11 rounded-xl invert dark:invert-0"
                priority
              />
            </Link>
          </div>

          {/* Search Input (Center-ish) */}
          <div className="hidden lg:flex flex-[1.5] items-center justify-center px-8 text-white">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search series or creators..."
                className="w-full bg-secondary/50 border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:bg-background transition-all"
              />
            </div>
          </div>

          {/* Right Actions (Right) */}
          <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
            <nav className="hidden xl:flex items-center gap-6 mr-2">
              <Link
                href="/shop"
                className="nav-item group relative h-10 cursor-pointer px-1"
              >
                <div className="flip-inner flex h-full items-center justify-center">
                  <span className="side side-front flex h-full items-center justify-center text-sm font-medium whitespace-nowrap text-foreground/70 group-hover:text-foreground">
                    WEBTOON SHOP
                  </span>
                  <span className="side side-back absolute inset-0 flex h-full items-center justify-center bg-linear-to-r from-primary to-amber-600 bg-clip-text text-sm font-bold whitespace-nowrap text-transparent">
                    WEBTOON SHOP
                  </span>
                </div>
              </Link>
              <Link
                href="/creators"
                className="nav-item group relative h-10 cursor-pointer px-1"
              >
                <div className="flip-inner flex h-full items-center justify-center">
                  <span className="side side-front flex h-full items-center justify-center text-sm font-medium whitespace-nowrap text-foreground/70 group-hover:text-foreground">
                    Creators 101
                  </span>
                  <span className="side side-back absolute inset-0 flex h-full items-center justify-center bg-linear-to-r from-primary to-amber-600 bg-clip-text text-sm font-bold whitespace-nowrap text-transparent">
                    Creators 101
                  </span>
                </div>
              </Link>
            </nav>

            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex rounded-full px-5 font-semibold transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Publish
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-5 font-semibold"
            >
              Log In
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
            <div className="relative group px-2">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-secondary/50 border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:bg-background"
              />
            </div>
            <Link
              href="/shop"
              className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              WEBTOON SHOP
            </Link>
            <Link
              href="/creators"
              className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Creators 101
            </Link>
            <div className="flex gap-2 px-2 pt-2">
              <Button className="flex-1 rounded-full" variant="outline">Publish</Button>
              <Button className="flex-1 rounded-full">Log In</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
