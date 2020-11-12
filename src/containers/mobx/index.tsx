import React, { FC } from "react";
import TodosContainer from "./todos";
import { Provider, store } from "../../stores/mobx";

const ProviderContainer: FC = () => {
  return (
    <Provider value={store}>
      <TodosContainer />
    </Provider>
  );
};
export default ProviderContainer;
