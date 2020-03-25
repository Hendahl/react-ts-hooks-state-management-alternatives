import React, { FC } from "react";
import store from "../../redux/store";
import Todos from "../../components/redux";
import { Provider } from "react-redux";

const ProviderContainer: FC = () => {
  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  );
};

export default ProviderContainer;
