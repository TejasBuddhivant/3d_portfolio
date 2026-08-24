import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "@reduxjs/toolkit";
import rootSaga from "./sagas/rootSaga";
import quoteReducer from "./slices/quoteSlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
  quote: quoteReducer,
  ui: uiReducer,
});

/**
 * Creates a fresh store instance.
 *
 * The Next.js App Router requires a per-request store on the server and a
 * single store on the client, so this factory is invoked by `StoreProvider`
 * (see apps/web/providers) instead of exporting a global singleton.
 */
export const makeStore = () => {
  // Async work is owned by Redux Saga — thunks are disabled on purpose.
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
