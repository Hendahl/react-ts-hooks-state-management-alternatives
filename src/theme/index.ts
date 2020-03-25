import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";

export default function appTheme(options: ThemeOptions) {
  return createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: orange[500]
      },
      secondary: {
        main: "#11cb5f"
      }
    },
    typography: {
      fontSize: 14
    },
    ...options
  });
}
