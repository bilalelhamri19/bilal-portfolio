"use client";

import * as React from "react";
import {
  Command as CommandPrimitive,
  useCommandState,
} from "cmdk";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Search, Home, User, Briefcase, FolderKanban, Code2, GraduationCap, Mail, ArrowRight, FileDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks, personalInfo } from "@/data/portfolio";

const Command = CommandPrimitive as unknown as typeof CommandPrimitive & {
  Dialog: typeof CommandPrimitive.Dialog;
  Input: typeof CommandPrimitive.Input;
  List: typeof CommandPrimitive.List;
  Empty: typeof CommandPrimitive.Empty;
  Group: typeof CommandPrimitive.Group;
  Item: typeof CommandPrimitive.Item;
  Shortcut: typeof CommandPrimitive.Shortcut;
  Separator: typeof CommandPrimitive.Separator;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  About: User,
  Experience: Briefcase,
  Projects: FolderKanban,
  Skills: Code2,
  Education: GraduationCap,
  Contact: Mail,
};

interface CommandPaletteProps {
  className?: string;
}

export default function CommandPalette({ className }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" &&
          !["INPUT", "TEXTAREA"].includes(
            (e.target as HTMLElement).tagName
          ))
      ) {
        e.preventDefault();
        setOpen((value) => !value);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 text-sm text-muted",
          className
        )}
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="ml-auto hidden lg:inline-flex h-5 items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 text-[10px] font-medium text-muted">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="fixed left-[50%] top-[18%] z-[100] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-bgdark/95 p-0 shadow-2xl backdrop-blur-xl outline-none sm:top-[22%]">
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="sr-only">
                  <DialogTitle>Command Palette</DialogTitle>
                  <DialogDescription>
                    Search and navigate the portfolio
                  </DialogDescription>
                </div>
                <Command className="w-full">
                  <div className="flex items-center border-b border-white/10 px-4">
                    <Search className="mr-2 h-5 w-5 shrink-0 text-muted" />
                    <Command.Input
                      placeholder="Type a command or search..."
                      className="flex h-14 w-full rounded-md bg-transparent text-base text-white placeholder:text-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Command.List className="max-h-[400px] overflow-y-auto p-2">
                    <Command.Empty className="flex h-24 items-center justify-center text-sm text-muted">
                      No results found.
                    </Command.Empty>

                    <Command.Group
                      heading="Navigation"
                      className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      {navLinks.map((link) => {
                        const Icon =
                          iconMap[link.name] || iconMap.Home;
                        return (
                          <Command.Item
                            key={link.name}
                            value={link.name}
                            onSelect={() => {
                              runCommand(() => {
                                document
                                  .querySelector(link.href)
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                  });
                              });
                            }}
                            className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white data-[selected=true]:bg-white/10"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-data-[selected=true]:bg-primary/20">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium">
                                {link.name}
                              </div>
                              <div className="text-xs text-muted truncate">
                                Go to {link.name.toLowerCase()} section
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted opacity-0 transition-all group-data-[selected=true]:opacity-100 group-data-[selected=true]:translate-x-0.5" />
                          </Command.Item>
                        );
                      })}
                    </Command.Group>

                    <Command.Separator className="my-2 h-px bg-white/10" />

                    <Command.Group
                      heading="Actions"
                      className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      <Command.Item
                        value="Download CV"
                        onSelect={() => {
                          runCommand(() => {
                            const link = document.createElement("a");
                            link.href = "/cv.pdf";
                            link.download = "CV.pdf";
                            link.click();
                          });
                        }}
                        className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white data-[selected=true]:bg-white/10"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent group-data-[selected=true]:bg-accent/20">
                          <FileDown className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Download CV</div>
                          <div className="text-xs text-muted">
                            Save a copy of my resume
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted opacity-0 transition-all group-data-[selected=true]:opacity-100 group-data-[selected=true]:translate-x-0.5" />
                      </Command.Item>

                      <Command.Item
                        value="Send Email"
                        onSelect={() => {
                          runCommand(() => {
                            window.location.href = `mailto:${personalInfo.email}`;
                          });
                        }}
                        className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white data-[selected=true]:bg-white/10"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary group-data-[selected=true]:bg-secondary/20">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Send Email</div>
                          <div className="text-xs text-muted">
                            {personalInfo.email}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted opacity-0 transition-all group-data-[selected=true]:opacity-100" />
                      </Command.Item>

                      <Command.Item
                        value="View GitHub"
                        onSelect={() => {
                          runCommand(() => {
                            window.open(personalInfo.github, "_blank");
                          });
                        }}
                        className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white data-[selected=true]:bg-white/10"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 group-data-[selected=true]:bg-white/15">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">View GitHub</div>
                          <div className="text-xs text-muted">
                            Open GitHub profile in new tab
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted opacity-0 transition-all group-data-[selected=true]:opacity-100" />
                      </Command.Item>
                    </Command.Group>
                  </Command.List>
                </Command>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
