"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { label: "English", code: "en" },
  { label: "Tiếng Việt", code: "vi" },
];

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("en");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0 text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition-colors focus-visible:ring-0"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 rounded-xl border-none p-1.5 shadow-lg bg-background/90 backdrop-blur-xl">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={cn(
              "flex items-center justify-between px-4 py-2.5 cursor-pointer rounded-md transition-colors outline-none focus:outline-none focus:bg-muted mb-0.5 last:mb-0",
              currentLang === lang.code
                ? "bg-primary/10 text-primary font-semibold"
                : "text-foreground/80 hover:bg-muted hover:text-foreground"
            )}
            onClick={() => setCurrentLang(lang.code)}
          >
            <div className="flex items-center gap-1">
              <span className="w-7 text-xs font-bold tracking-tight uppercase opacity-60">
                {lang.code}
              </span>
              <span className="text-sm font-medium">{lang.label}</span>
            </div>
            {currentLang === lang.code && <Check className="h-4 w-4 stroke-[2.5px]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
