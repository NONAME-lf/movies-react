import { Card, CardBody, CardHeader } from "react-bootstrap";
import ResultItem from "./ResultItem";

export default function MoviesList(props) {
  return (
    <Card className="">
      <Card.Header>
        <h3>Search results: {props.total}</h3>
      </Card.Header>
      <Card.Body className="movies-grid">
        {props.items.map((item, index) => (
          <ResultItem data={item} key={index} />
        ))}
      </Card.Body>
    </Card>
  );
}
