import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { TaskListPage } from "./pages/TaskListPage";
import { NewTaskPage } from "./pages/NewTaskPage";
import { TaskDetailsPage as TaskDetailsPage } from "./pages/TaskDetailsPage";
import { EditTaskPage as EditTaskPage } from "./pages/EditTaskPage";
import { TaskDetailsLayout as TaskDetailsLayout } from "./component/TaskDetailsLayout";

function App() {
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
