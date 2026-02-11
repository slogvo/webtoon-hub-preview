import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="webtoon-logo">
              WEBTOON
            </a>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#" className="nav-link">
                Originals
              </a>
              <a href="#" className="nav-link flex items-center gap-1">
                Categories
                <ChevronDown className="w-4 h-4" />
              </a>
              <a href="#" className="nav-link">
                Rankings
              </a>
              <a href="#" className="nav-link">
                Canvas
              </a>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                WEBTOON SHOP
              </a>
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Creators 101
              </a>
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
