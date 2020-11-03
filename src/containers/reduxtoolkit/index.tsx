import React, { FC } from "react";
import store from "../../reduxtoolkit/store";
import Todos from "../../components/reduxtoolkit";
import { Provider } from "react-redux";

const ProviderContainer: FC = () => {
  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  );
};

export default ProviderContainer;
