import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { TaskListPage } from "./pages/TaskListPage";
import { NewTaskPage } from "./pages/NewTaskPage";
import { TaskDetailsPage as TaskDetailsPage } from "./pages/TaskDetailsPage";
import { EditTaskPage as EditTaskPage } from "./pages/EditTaskPage";
import { TaskDetailsLayout as TaskDetailsLayout } from "./component/TaskDetailsLayout";
import { useMemo, useState } from "react";

export type Tag = {
  id: string;
  label: string;
};

export type TaskData = {
  title: string;
  details: string;
  tags: Tag[];
};

export type Note = {
  id: string;
} & TaskData;

function App() {
  // const [tasks, setTasks] = useState([]);
  // const [tags, setTags] = useState([]);

  // const notesWithTags = useMemo(() => {
  //   return tasks.map((task)=>{
  //     ...task,
  //     tags: {}
  //   });
  // }, []);

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<TaskListPage />}></Route>
        <Route path="/new" element={<NewTaskPage />}></Route>
        <Route path="/:id" element={<TaskDetailsLayout />}>
          <Route index element={<TaskDetailsPage />}></Route>
          <Route path="edit" element={<EditTaskPage />}></Route>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
