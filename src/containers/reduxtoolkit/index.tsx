import React, { FC } from "react";
import store from "../../stores/reduxtoolkit";
import TodosContainer from "./todos";
import { Provider } from "react-redux";

const ProviderContainer: FC = () => {
  return (
    <Provider store={store}>
      <TodosContainer />
    </Provider>
  );
};

export default ProviderContainer;
