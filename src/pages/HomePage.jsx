import { Container } from "react-bootstrap";
import SearchForm from "../components/SearchForm";
import MoviesList from "../components/MoviesList";
import { useState } from "react";
import LoaderOverlay from "../components/LoaderOverlay";
import { delay } from "../helpers";
import useStorage from "../hooks/useStorage";
import { toast, ToastContainer } from "react-toastify";
import { createContext } from "react";

export const TypeContext = createContext();

export default function HomePage() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [type, setType] = useState("");
  const { getItem, setItem } = useStorage();

  const searchHandler = async (params) => {
    setType(params.type);
    setInProgress(true);
    const storeKey = params.search.replaceAll(" ", "_") + "_" + params.type;
    const cachedList = getItem(storeKey);
    if (cachedList) {
      setMovieList(cachedList.results);
      setTotalPages(cachedList.total_pages);
      setTotalItems(cachedList.total_results);
      setInProgress(false);
      return;
    }
    const url = `https://api.themoviedb.org/3/search/${params.type}?include_adult=false&language=en-US&page=1&query=${params.search}`;
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
        setItem(storeKey, data);
        setMovieList(data.results);
        setTotalPages(data.total_pages);
        setTotalItems(data.total_results);
      } else {
        throw new Error(
          "Error fetching movies with status: " + response.status
        );
      }
    } catch (err) {
      toast.error("Occured error: " + err);
    } finally {
      await delay(1000);
      setInProgress(false);
    }
  };

  return (
    <>
      <TypeContext value={type}>
        {inProgress && <LoaderOverlay />}
        <Container className="pt-3">
          <SearchForm onSearch={searchHandler} />
          <MoviesList items={movieList} total={totalItems} />
        </Container>
      </TypeContext>
    </>
  );
}
