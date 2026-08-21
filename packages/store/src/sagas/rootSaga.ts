import { all, fork } from "redux-saga/effects";
import { watchFetchQuote } from "./quoteSaga";

/** Single entry point — every feature saga is forked from here. */
export default function* rootSaga() {
  yield all([fork(watchFetchQuote)]);
}
