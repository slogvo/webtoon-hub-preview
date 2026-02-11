"use client";

import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="webtoon-logo">
              WEBTOON
            </Link>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/originals" className="nav-link">
                Originals
              </Link>
              <button className="nav-link flex items-center gap-1">
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              <Link href="/rankings" className="nav-link">
                Rankings
              </Link>
              <Link href="/canvas" className="nav-link">
                Canvas
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <Link
                href="/shop"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                WEBTOON SHOP
              </Link>
              <Link
                href="/creators"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Creators 101
              </Link>
            </nav>

            <Button
              variant="default"
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 font-semibold"
            >
              Publish
            </Button>

            <Button variant="outline" size="sm" className="font-semibold">
              Log In
            </Button>

            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
