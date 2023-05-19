import { Badge, Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../css/NoteList.module.css";
import { Tag } from "../App";

type TaskCardProps = {
  id: string;
  title: string;
  tags: Tag[];
  onDelete: (id: string) => void;
};

export function TaskCard({ id, title, tags, onDelete }: TaskCardProps) {
  return (
    <Card className={`h-100 ${styles.card}`}>
      <Card.Body>
        <Row>
          <Col
            as={Link}
            to={`/${id}`}
            className="text-reset text-decoration-none col-md-10"
          >
            <Stack gap={2}>
              <span className="fs-4">{title}</span>
              {tags.length > 0 && (
                <Stack
                  gap={1}
                  direction="horizontal"
                  className="overflow-hidden"
                >
                  {tags.map((tag) => (
                    <Badge className="text-truncate" key={tag.id}>
                      {tag.label}
                    </Badge>
                  ))}
                </Stack>
              )}
            </Stack>
          </Col>
          <Col className="col-md-2">
            <Button
              className="btn-close"
              onClick={() => {
                onDelete(id);
              }}
            ></Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
