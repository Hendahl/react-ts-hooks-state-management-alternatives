import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { FC, useEffect, useState } from "react";

interface Progress {
  isUpdating: boolean;
}

const Progress: FC<Progress> = ({ isUpdating }) => {
  const [showProgress, setShowProgress] = useState<boolean>(false);

  useEffect(() => {
    if (isUpdating) setShowProgress(true);
    setTimeout(() => {
      setShowProgress(false);
    }, 400);
  }, [isUpdating]);

  return (
    <Fade in={showProgress}>
      <LinearProgress />
    </Fade>
  );
};

export default Progress;
