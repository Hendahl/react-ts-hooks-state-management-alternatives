import App from "../components/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { FC, useMemo } from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { themeOverrides } from "../theme";
import { useMediaQuery } from "@material-ui/core";

const AppContainer: FC = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => themeOverrides(prefersDarkMode), [
    prefersDarkMode
  ]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};
export default AppContainer;
