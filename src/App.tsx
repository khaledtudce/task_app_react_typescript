import "bootstrap/dist/css/bootstrap.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Container } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TaskListPage } from "./pages/TaskListPage";
import { NewTaskPage } from "./pages/NewTaskPage";
import { TaskDetailsPage as TaskDetailsPage } from "./pages/TaskDetailsPage";
import { EditTaskPage as EditTaskPage } from "./pages/EditTaskPage";
import { TaskDetailsLayout as TaskDetailsLayout } from "./component/TaskDetailsLayout";
import { useLocalStroge } from "./hook/useLocalStroge";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { confirmAlert } from "react-confirm-alert";

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
  const navigate = useNavigate();

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

  function onUpdateTask(id: string, { tags, ...data }: TaskData) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return task;
        }
      });
    });
  }

  function onDeleteTaskFromTaskDetails(id: string) {
    deleteTask(id, true);
  }

  function onDeleteTask(id: string) {
    deleteTask(id, false);
  }

  function deleteTask(id: string, isFromTaskDetails: boolean) {
    confirmAlert({
      title: "Confirm Delete",
      message: "Do you really want to delete?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => {
            setTasks(tasks.filter((task) => task.id != id));
            if (isFromTaskDetails) navigate("..");
          },
        },
      ],
    });
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onUpdateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label: label };
        } else {
          return tag;
        }
      });
    });
  }

  function onDeleteTag(id: string) {
    setTags(tags.filter((tag) => tag.id != id));
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <TaskListPage
              availableTags={tags}
              tasks={tasksWithConnectedTags}
              onDeleteTask={onDeleteTask}
              onUpdateTag={onUpdateTag}
              onDeleteTag={onDeleteTag}
            />
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
          <Route
            index
            element={<TaskDetailsPage onDelete={onDeleteTaskFromTaskDetails} />}
          ></Route>
          <Route
            path="edit"
            element={
              <EditTaskPage
                onSubmit={onUpdateTask}
                onAddTag={onAddTag}
                availableTags={tags}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
