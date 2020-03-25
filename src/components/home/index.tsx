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
          Home
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
          <Typography variant="body1" gutterBottom paragraph={true}>
            <Link href="https://github.com/Hendahl/react-ts-hooks-state-management-alternatives">
              See other state management options here
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
