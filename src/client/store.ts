import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./reducer";

const RootStore = configureStore({
  reducer: RootReducer,
});
//
// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("./rootReducer", () => {
//     const newRootReducer = require("./rootReducer").default;
//     RootStore.replaceReducer(newRootReducer);
//   });
// }

// export type AppDispatch = typeof RootStore.dispatch;

export default RootStore;
