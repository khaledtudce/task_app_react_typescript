import { Navigate, Outlet, useParams } from "react-router-dom";
import { Task } from "../App";

type TaskDetailsLayoutProps = {
  tasks: Task[];
};

export function TaskDetailsLayout({ tasks }: TaskDetailsLayoutProps) {
  const { id } = useParams();
  const currentTask = tasks.find((task) => task.id === id);
  if (currentTask === null) return <Navigate to="/" replace />;

  return <Outlet context={currentTask}></Outlet>;
}
