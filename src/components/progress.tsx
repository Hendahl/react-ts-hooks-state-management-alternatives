import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { FC, useEffect, useState } from "react";

const ProgressComponent: FC<{ isUpdating: boolean }> = (props) => {
  const [stateProgress, setStateProgress] = useState<boolean>(false);

  useEffect(() => {
    if (props.isUpdating) setStateProgress(true);
    setTimeout(() => {
      setStateProgress(false);
    }, 400);
  }, [props.isUpdating]);

  return (
    <Fade in={stateProgress}>
      <LinearProgress />
    </Fade>
  );
};

export default ProgressComponent;
