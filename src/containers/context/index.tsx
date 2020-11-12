import React, { FC } from "react";
import TodosContainer from "./todos";
import { Provider } from "../../stores/context";

const ProviderContainer: FC = () => {
  return (
    <Provider>
      <TodosContainer />
    </Provider>
  );
};
export default ProviderContainer;
