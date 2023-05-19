import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { Tag, TaskData } from "../App";
import { v4 as uuidV4 } from "uuid";

export type TaskFormProps = {
  onSubmit: (data: TaskData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<TaskData>;

export function TaskForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  details = "",
  tags = [],
}: TaskFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      details: detailsRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef} defaultValue={title} />
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
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label: label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Col>
          <Form.Group controlId="details">
            <Form.Label>Details</Form.Label>
            <Form.Control
              required
              ref={detailsRef}
              defaultValue={details}
              as="textarea"
              rows={12}
            />
          </Form.Group>
        </Col>
        <Stack direction="horizontal" gap={3} className="justify-content-end">
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
