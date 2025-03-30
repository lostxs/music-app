"use client";

import { useRouter } from "next/navigation";
import { Home, Library } from "lucide-react";

import { Button } from "~/shared/components/ui/button";

export function MainSection() {
  const router = useRouter();

  const items = [
    {
      title: "Home",
      icon: Home,
      href: "/",
    },
    {
      title: "Library",
      icon: Library,
      href: "/library",
    },
  ];

  return (
    <header className="relative z-1 flex flex-col gap-2 px-4 pt-3 pb-2 group-data-[collapsed=true]:gap-4">
      <div className="flex flex-col items-center gap-2">
        {items.map((item) => (
          <div
            className="me-auto flex min-w-0 flex-row items-center gap-1 group-data-[collapsed=true]:flex-col group-data-[collapsed=true]:gap-2"
            key={item.title}
          >
            <Button
              onClick={() => router.push(item.href)}
              variant="ghost"
              size="icon"
              className="hover:text-foreground text-foreground/80 h-10 w-full justify-start rounded-full px-2 py-1 text-base font-bold hover:bg-transparent"
            >
              <item.icon className="size-6" />
              <span className="group-data-[collapsed=true]:hidden">
                {item.title}
              </span>
            </Button>
          </div>
        ))}
      </div>
    </header>
  );
}
