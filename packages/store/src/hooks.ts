import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

/** Typed dispatch — knows about every action in the app. */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Typed selector over the root state. */
export const useAppSelector = useSelector.withTypes<RootState>();
