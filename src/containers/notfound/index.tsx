import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <>
      <Box display="flex" justifyContent="center" m={1} p={1}>
        <Box p={1}>
          <Typography variant="h6" component="h2">
            404 - This page dont exists
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" m={1} p={1}>
        <Box p={1}>
          <Button color="primary" component={Link} to="/">
            Home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
