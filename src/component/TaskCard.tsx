import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SimplifiedTask } from "../pages/TaskListPage";

export function TaskCard({ id, title, tags }: SimplifiedTask) {
  return (
    <Card as={Link} to={`/${id}`}>
      <Card.Body>
        <Stack gap={2}>
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal">
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
