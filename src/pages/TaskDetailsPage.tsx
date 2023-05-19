import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useTask } from "../component/useTask";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type TaskDetailsPageProps = {
  onDelete: (id: string) => void;
};

export function TaskDetailsPage({ onDelete }: TaskDetailsPageProps) {
  const task = useTask();
  const navigate = useNavigate();
  return (
    <>
      <Row className="border align-items-center mb-4">
        <Col className="border">
          <Stack direction="vertical">
            <h1>{task.title}</h1>
            <Stack gap={1} direction="horizontal">
              {task.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          </Stack>
        </Col>
        <Col xs="auto" className="border">
          <Stack gap={2} direction="horizontal" className="p-3">
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
            <Link to={`/${task.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => {
                onDelete(task.id);
                navigate("..");
              }}
            >
              Delete
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col className="border">
          <ReactMarkdown>{task.details}</ReactMarkdown>
        </Col>
      </Row>
    </>
  );
}
