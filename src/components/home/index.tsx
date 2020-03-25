import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const Home: FC = () => {
  return (
    <>
      <Box textAlign="center" m={1}>
        <Typography variant="h3" component="h2">
          About this App
        </Typography>
        <Box m={3}>
          <Typography variant="body1" gutterBottom paragraph={true}>
            A classic React TypeScript Todo App with alternative state
            management side by side.
          </Typography>
          <Typography variant="body1" gutterBottom paragraph={true}>
            Lorum Ipsum @TODO
          </Typography>
        </Box>
        <Typography variant="h5" component="h3" gutterBottom>
          <Link color="primary" component={RouterLink} to="/basic">
            Basic React Hooks
          </Link>
        </Typography>

        <Typography variant="body1" gutterBottom paragraph={true}>
          React State and Effect
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
          <Link color="primary" component={RouterLink} to="/context">
            React Context & Reducer
          </Link>
        </Typography>
        <Typography variant="body1" gutterBottom paragraph={true}>
          React Hooks Context and Reducer
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
          <Link color="primary" component={RouterLink} to="/redux">
            Redux State Container
          </Link>
        </Typography>
        <Typography variant="body1" gutterBottom paragraph={true}>
          Redux, Thunk & dev tools
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
          <Link color="primary" component={RouterLink} to="/Mobx">
            MobX State management
          </Link>
        </Typography>
        <Typography variant="body1" gutterBottom paragraph={true}>
          MobX, MobX-lite and MobX-state-Tree
        </Typography>
      </Box>
    </>
  );
};

export default Home;
