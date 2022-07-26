import { FC, useEffect } from "react";
import { detectTheme } from "./helpers/theme";
import { Theme } from "./library/types";

export const App: FC = () => {
  useEffect(() => detectTheme(), []);
  const toggleTheme = () =>
    document.body.classList.contains(Theme.Dark)
      ? document.body.classList.remove(Theme.Dark)
      : document.body.classList.add(Theme.Dark);

  return (
    <div className="p-3">
      <header className="py-2 md:bg-blue-100">Hello World!</header>
      <button onClick={toggleTheme} className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Toggle theme</button>
    </div>
  );
};

export default App;
