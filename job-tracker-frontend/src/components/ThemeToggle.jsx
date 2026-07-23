import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { memo } from "react";

function ThemeToggle() {

    const { theme, setTheme } = useTheme();

    return (

        <Switch
            data-testid="theme-toggle"
            checked={theme === "dark"}
            aria-label="Toggle dark mode"
            onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
            }
        />

    );

}

export default memo(ThemeToggle);