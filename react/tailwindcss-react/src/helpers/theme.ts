import { Theme } from "../library/types";

export const detectTheme = () => {
  let theme: Theme = Theme.Light;
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme") as Theme;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = Theme.Dark;
    localStorage.setItem("theme", theme);
  }

  theme === Theme.Dark && document.body.classList.add(theme);
};
