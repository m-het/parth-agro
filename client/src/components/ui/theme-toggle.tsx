import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="relative h-9 w-9 rounded-full transition-all duration-300 hover:bg-accent"
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                    <Sun
                        className={`h-5 w-5 transition-all duration-300 ${theme === "dark"
                                ? "rotate-0 scale-100"
                                : "rotate-90 scale-0"
                            }`}
                    />
                    <Moon
                        className={`absolute h-5 w-5 transition-all duration-300 ${theme === "dark"
                                ? "rotate-90 scale-0"
                                : "rotate-0 scale-100"
                            }`}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
            </TooltipContent>
        </Tooltip>
    );
}
