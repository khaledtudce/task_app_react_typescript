import { Tag, TaskData } from "../App";
import { TaskForm } from "../component/TaskForm";

type NewTaskProps = {
  onSubmit: (data: TaskData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewTaskPage({
  onSubmit,
  onAddTag,
  availableTags,
}: NewTaskProps) {
  return (
    <>
      <h1 className="mb-4">New Task</h1>
      <TaskForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
