import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import useStorage from "../hooks/useStorage";

export default function ThemeSwitcher() {
  const { getStorageItem, setStorageItem } = useStorage();
  const [isDarkTheme, setDarkTheme] = useState(
    getStorageItem(
      "dark",
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
  );

  if (isDarkTheme) document.body.setAttribute("data-bs-theme", "dark");

  const checkHandler = (e) => {
    setDarkTheme(e.target.checked);
    setStorageItem("dark", e.target.checked + ""); // String(e.target.checked)
    document.body.setAttribute(
      "data-bs-theme",
      e.target.checked ? "dark" : "light"
    );
  };

  const mediaHandler = (e) => {
    if (getStorageItem("dark", null) === null) {
      document.body.setAttribute("data-bs-theme", e.matches ? "dark" : "light");
      setDarkTheme(e.matches);
    }
  };

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", mediaHandler);
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", mediaHandler);
    };
  }, []);

  return (
    <Form.Check
      type="switch"
      id="theme-switch"
      label=""
      onChange={checkHandler}
      checked={isDarkTheme}
    />
  );
}
