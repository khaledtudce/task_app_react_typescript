import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { TaskListPage } from "./pages/TaskListPage";
import { NewTaskPage } from "./pages/NewTaskPage";
import { TaskDetailsPage as TaskDetailsPage } from "./pages/TaskDetailsPage";
import { EditTaskPage as EditTaskPage } from "./pages/EditTaskPage";
import { TaskDetailsLayout as TaskDetailsLayout } from "./component/TaskDetailsLayout";
import { useLocalStroge } from "./hook/useLocalStroge";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

export type Tag = {
  id: string;
  label: string;
};

export type Task = {
  id: string;
} & TaskData;

export type TaskData = {
  title: string;
  details: string;
  tags: Tag[];
};

export type RawTask = {
  id: string;
} & RawTaskData;

export type RawTaskData = {
  title: string;
  details: string;
  tagIds: string[];
};

function App() {
  const [tasks, setTasks] = useLocalStroge<RawTask[]>("TASKS", []);
  const [tags, setTags] = useLocalStroge<Tag[]>("TAGS", []);

  const tasksWithConnectedTags = useMemo(() => {
    return tasks.map((task) => {
      return {
        ...task,
        tags: getTagsOfOneTask(),
      };

      function getTagsOfOneTask(): Tag[] {
        return tags.filter((tag) => task.tagIds.includes(tag.id));
      }
    });
  }, [tasks, tags]);

  function onCreateTask({ tags, ...data }: TaskData) {
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        { id: uuidV4(), ...data, tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <TaskListPage availableTags={tags} tasks={tasksWithConnectedTags} />
          }
        ></Route>
        <Route
          path="/new"
          element={
            <NewTaskPage
              onSubmit={onCreateTask}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        ></Route>
        <Route
          path="/:id"
          element={<TaskDetailsLayout tasks={tasksWithConnectedTags} />}
        >
          <Route index element={<TaskDetailsPage />}></Route>
          <Route path="edit" element={<EditTaskPage />}></Route>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
