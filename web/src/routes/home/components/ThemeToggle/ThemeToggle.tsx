import { Button } from "@mui/material";
import { useTheme } from "@/theme/ThemeContext";

export const ThemeToggle = () => {
  const { toggleTheme, mode } = useTheme();

  return (
    <Button variant="outlined" onClick={toggleTheme}>
      Toggle {mode === "light" ? "Dark" : "Light"}
    </Button>
  );
};
