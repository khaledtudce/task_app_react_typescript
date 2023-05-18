import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Tag } from "../App";
import { Link } from "react-router-dom";
import { TaskCard } from "../component/TaskCard";

export type SimplifiedTask = {
  tags: Tag[];
  title: string;
  id: string;
};

type TaskListProps = {
  availableTags: Tag[];
  tasks: SimplifiedTask[];
};

export function TaskListPage({ availableTags, tasks }: TaskListProps) {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return (
        isTitleEmptyOrIsItSimilarTaskTitle() &&
        IsTagEmptyOrIsTagAvailableInTaskTag()
      );

      function isTitleEmptyOrIsItSimilarTaskTitle(): boolean {
        return title === "" || isTitleAvailableInNoteTitle();
      }

      function isTitleAvailableInNoteTitle(): boolean {
        return task.title.toLowerCase().includes(title.toLowerCase());
      }

      function IsTagEmptyOrIsTagAvailableInTaskTag(): boolean {
        return selectedTags.length === 0 || isTagAvailableInNoteTag();
      }

      function isTagAvailableInNoteTag(): boolean {
        return selectedTags.every((tag) =>
          task.tags.some((noteTag) => noteTag.id === tag.id)
        );
      }
    });
  }, [title, tasks, selectedTags]);

  return (
    <>
      <Stack gap={4}>
        <Row className="border">
          <Col>
            <h1 className="mb-4">Task Lists</h1>
          </Col>
          <Col xs="auto" className="border">
            <Stack gap={2} direction="horizontal" className="p-3">
              <Link to="/new">
                <Button variant="primary">Create Task</Button>
              </Link>
              <Button variant="outline-secondary">Edit Tags</Button>
            </Stack>
          </Col>
        </Row>
        <Form>
          <Row className="border">
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  isMulti
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3 border">
          {filteredTasks.map((task) => (
            <Col key={task.id} className="mt-4">
              <TaskCard id={task.id} title={task.title} tags={task.tags} />
            </Col>
          ))}
        </Row>
      </Stack>
    </>
  );
}
