import React, { FC } from "react";
import Todos from "../../components/context";
import { Provider } from "../../context/store";

const ProviderContainer: FC = () => {
  return (
    <Provider>
      <Todos />
    </Provider>
  );
};
export default ProviderContainer;
