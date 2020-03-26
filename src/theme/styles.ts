import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    listItemText: {
      color: "#000000"
    },
    listItem: {
      borderBottom: "2px solid #00000"
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
