import { Tag, TaskData } from "../App";
import { TaskForm } from "../component/TaskForm";
import { useTask } from "../component/useTask";

type EditTaskPageProps = {
  onSubmit: (id: string, data: TaskData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditTaskPage({
  onSubmit,
  onAddTag,
  availableTags,
}: EditTaskPageProps) {
  const task = useTask();
  return (
    <>
      <h1 className="mb-4">Edit Task</h1>
      <TaskForm
        onSubmit={(data) => onSubmit(task.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
        title={task.title}
        details={task.details}
        tags={task.tags}
      />
    </>
  );
}
