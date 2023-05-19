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
            className="border text-reset text-decoration-none"
          >
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
          </Col>
          <Col className="border" xs="auto">
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
