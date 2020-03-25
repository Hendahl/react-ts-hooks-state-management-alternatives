import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    listItemText: {
      color: "#FFFFFF"
    },

    listItem: {
      borderBottom: "2px solid #ffffff1f"
    },
    title: {
      fontSize: "2rem"
    },
    titleCompleted: {
      fontSize: "2rem",
      textDecoration: "line-through"
    }
  })
);
