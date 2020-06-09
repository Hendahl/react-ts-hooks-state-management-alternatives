import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { FC, useEffect, useState } from "react";

interface IProgressComponent {
  isUpdating: boolean;
}

const ProgressComponent: FC<IProgressComponent> = ({ isUpdating }) => {
  const [stateProgress, setStateProgress] = useState<boolean>(false);

  useEffect(() => {
    if (isUpdating) setStateProgress(true);
    setTimeout(() => {
      setStateProgress(false);
    }, 400);
  }, [isUpdating]);

  return (
    <Fade in={stateProgress}>
      <LinearProgress />
    </Fade>
  );
};

export default ProgressComponent;
