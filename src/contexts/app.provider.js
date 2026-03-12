import React, { useReducer } from "react";
import { AppContext } from "./app.context";

function reducer(state, action) {
  switch (action.type) {
    case "ACTION_TYPE":
      return {
        ...state,
        actionType: action?.type || null,
      };

    default:
      return state;
  }
}

export const AppProvider = ({ children, initData }) => {
  const [appState, appDispatch] = useReducer(reducer, [initData]);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};
