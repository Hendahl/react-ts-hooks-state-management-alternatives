import * as t from "../../ts/types";
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
          Homex
        </Typography>
        <Box m={3}>
          <Typography variant="h5" component="h3" gutterBottom>
            <Link color="primary" component={RouterLink} to="/basic">
              Basic
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom paragraph={true}>
            React State and Effect with classic component "Prop Drilling"
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            <Link color="primary" component={RouterLink} to="/context">
              Context
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom paragraph={true}>
            React Context and Reducer to pass data and actions through the
            components.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            <Link color="primary" component={RouterLink} to="/redux">
              Redux
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom paragraph={true}>
            Redux Store, Actions and Reducers to pass data and actions through
            the components.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            <Link color="primary" component={RouterLink} to="/reduxtoolkit">
              Redux Toolkit (Immer)
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom paragraph={true}>
            Redux ToolKit, Store to pass data and actions through the components
            by slices and storeconfig. Immer is used here...
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            <Link color="primary" component={RouterLink} to="/pullstate">
              Pullstate (Immer)
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom paragraph={true}>
            Pullstate, Store and update to pass data through the components.
            Immer is used here...
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            <Link color="primary" component={RouterLink} to="/Mobx">
              MobX
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom paragraph={true}>
            React Context as Store for MobX-state-Tree Models and Actions to
            pass data and actions through the components.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Default data structure
          </Typography>
          <pre>
            <Typography variant="body1" gutterBottom paragraph={true}>
              {JSON.stringify(t.initialTodos, null, 4)}
            </Typography>
          </pre>
        </Box>
      </Box>
    </>
  );
};

export default Home;
