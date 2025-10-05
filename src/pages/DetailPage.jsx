import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function DetailPage() {
  const params = useParams();
  const [item, setItem] = useState(null);
  console.log([params]);

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/${params.type}/${params.id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_TMDB_TOKEN,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setItem(data);
      } else {
        throw new Error(
          "Error fetching movies with status: " + response.status
        );
      }
    } catch (err) {
      toast.error("Occured error: " + err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  if (!item) {
    return null;
  }
  // [REFACTOR] Could be done with a map object too???
  if (params.type === "movie") {
    return <h1>{item.title}</h1>;
  } else if (params.type === "tv") {
    return <h1>{item["original_name"]}</h1>;
  } else if (params.type === "person") {
    return <h1>{item.name}</h1>;
  }

  // const titleMap = {
  //   movie: item.title,
  //   tv: item["original_name"],
  //   person: item.name,
  // };
  // return <h1>{titleMap[params.type]}</h1>;
}
