import React, { FC } from "react";
import Todos from "../../components/mobx";
import { Provider, store } from "../../mobx/store";

const ProviderContainer: FC = () => {
  return (
    <Provider value={store}>
      <Todos />
    </Provider>
  );
};
export default ProviderContainer;
