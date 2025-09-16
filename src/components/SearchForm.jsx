import { Button, Col, Row, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SearchForm(props) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("movie");

  const submitHandler = (e) => {
    e.preventDefault();
    const searchString = search.trim().toLowerCase();
    if (searchString === "") {
      return toast.warning("Please enter a search term");
    }
    props.onSearch({ search: searchString, type });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <form onSubmit={submitHandler}>
          <Row>
            <Col>
              <Form.Control
                value={search}
                type="search"
                placeholder="Enter name of the movie"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="movie">Movie</option>
                <option value="tv">TV Show</option>
                <option value="person">Person</option>
              </Form.Select>
            </Col>
            <Col>
              <Button type="submit">Search</Button>
            </Col>
            <Col></Col>
          </Row>
        </form>
      </Card.Body>
    </Card>
  );
}
