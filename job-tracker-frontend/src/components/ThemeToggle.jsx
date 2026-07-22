import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { memo } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={(checked) =>
        setTheme(checked ? "dark" : "light")
      }
    />
  );
}

export default memo(ThemeToggle);