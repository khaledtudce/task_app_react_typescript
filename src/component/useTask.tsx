import { useOutletContext } from "react-router-dom";
import { Task } from "../App";

export function useTask() {
  return useOutletContext<Task>();
}
