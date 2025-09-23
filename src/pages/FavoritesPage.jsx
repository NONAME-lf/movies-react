import { Card } from "react-bootstrap";
import ResultItem from "../components/ResultItem";
import useStorage from "../hooks/useStorage";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function FavoritesPage() {
  const { getStorageItem } = useStorage();
  const [favList, setFavList] = useState(getStorageItem("favorites", []));

  const filteredItems = (type) => {
    return (
      <div className="movies-grid">
        {favList
          .filter((el) => el.type === type)
          .map((item, index) => (
            <ResultItem
              data={item}
              key={index}
              favCallback={() => setFavList(getStorageItem("favorites", []))}
            />
          ))}
      </div>
    );
  };

  return (
    <Card className="">
      <Card.Body>
        <Tabs
          defaultActiveKey="movies"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="movies" title="Movies">
            {filteredItems("movie")}
          </Tab>
          <Tab eventKey="tv" title="TV Shows">
            {filteredItems("tv")}
          </Tab>
          <Tab eventKey="persons" title="Persons">
            {filteredItems("person")}
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}
