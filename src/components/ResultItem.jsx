import { Button, Card } from "react-bootstrap";
import noImage from "./../assets/img/no-image.jpg";
import { formatDate } from "../helpers";
import { useContext, useState } from "react";
import { TypeContext } from "../pages/HomePage";
import { NavLink } from "react-router";
import useStorage from "../hooks/useStorage";

export default function ResultItem({ data, favCallback }) {
  const IMG_BASE = "https://image.tmdb.org/t/p/w500/";
  const type = data.type || useContext(TypeContext);
  const { setStorageItem, getStorageItem } = useStorage();
  const favList = getStorageItem("favorites", []);
  const [isInFav, setInFav] = useState(
    Boolean(favList.find((el) => el.id === data.id && el.type === type))
  );
  let title = "";
  let date = "";
  let imageSrc = "";
  switch (type) {
    case "movie":
      // return <MovieItem data={data} />;
      title = data.title;
      date = data.release_date;
      imageSrc = data.poster_path ? IMG_BASE + data.poster_path : noImage;
      break;
    case "tv":
      title = data.name;
      "";
      date = data.first_air_date;
      imageSrc = data.poster_path ? IMG_BASE + data.poster_path : noImage;
      break;
    case "person":
      title = data.name;
      date = null;
      imageSrc = data.profile_path ? IMG_BASE + data.profile_path : noImage;
      break;
    default:
      return null;
  }

  // const cardImageSrc = () => {
  //   if (type === "person") {
  //     return data.profile_path ? IMG_BASE + data.profile_path : noImage;
  //   }
  //   return data.poster_path ? IMG_BASE + data.poster_path : noImage;
  // };

  const favHandler = () => {
    const favItems = getStorageItem("favorites", []);
    const favIndex = favItems.findIndex(
      (el) => el.id === data.id && el.type === type
    );
    if (favIndex !== -1) {
      !favCallback && setInFav(false);
      setStorageItem("favorites", favItems.toSpliced(favIndex, 1));
    } else {
      !favCallback && setInFav(true);
      const favItem = {
        id: data.id,
        type,
        [type === "movie" ? "title" : "name"]: title,
        [type === "movie" ? "release date" : "first air date"]: date,
      };
      if (type === "person") {
        favItem.profile_path = data.profile_path;
      } else {
        favItem.poster_path = data.poster_path;
      }
      setStorageItem("favorites", [...favItems, favItem]);
    }
    favCallback && favCallback();
  };

  return (
    <Card>
      <Card.Img src={imageSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {date &&
            (<time datatime={date}>{formatDate(date)}</time> ||
              data.known_for_department)}
        </Card.Text>
        <NavLink to={`/detail/${type}/${data.id}`} className={"btn btn-info"}>
          Details
        </NavLink>
        <Button className="btn btn-warning" onClick={favHandler}>
          {isInFav ? "★ " : "☆"}
        </Button>
      </Card.Body>
    </Card>
  );
}

function MovieItem({ data }) {
  return (
    <>
      <Card.Title>{data.title}</Card.Title>
      <Card.Text>
        {
          <time datatime={data.release_date}>
            {formatDate(data.release_date)}
          </time>
        }
      </Card.Text>
    </>
  );
}

function TVItem({ data }) {
  return (
    <>
      <Card.Title>{data.name}</Card.Title>
      <Card.Text>
        {
          <time datatime={data.first_air_date}>
            {formatDate(data.first_air_date)}
          </time>
        }
      </Card.Text>
    </>
  );
}

function PersonItem({ data }) {
  return (
    <>
      <Card.Title>{data.name}</Card.Title>
      <Card.Text>{data.known_for_department}</Card.Text>
    </>
  );
}
