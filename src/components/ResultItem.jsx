import { Card } from "react-bootstrap";
import noImage from "./../assets/img/no-image.jpg";
import { formatDate } from "../helpers";
import { useContext } from "react";
import { TypeContext } from "../pages/HomePage";
import { NavLink } from "react-router";

export default function ResultItem({ data }) {
  const IMG_BASE = "https://image.tmdb.org/t/p/w500/";
  const type = useContext(TypeContext);

  let title = "",
    date = "",
    imageSrc = "";
  switch (type) {
    case "movie":
      // return <MovieItem data={data} />;
      title = data.title;
      date = data.release_date;
      imageSrc = data.poster_path ? IMG_BASE + data.poster_path : noImage;
      break;
    case "tv":
      title = data.name;
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
        {/* <Button data-id={data.id}>View Details</Button> */}
        <NavLink to={`/detail/${type}/${data.id}`} className={"btn btn-info"}>
          Details
        </NavLink>
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
