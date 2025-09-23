import { Container, Pagination } from "react-bootstrap";
import SearchForm from "../components/SearchForm";
import MoviesList from "../components/MoviesList";
import { useEffect, useState } from "react";
import LoaderOverlay from "../components/LoaderOverlay";
import { delay } from "../helpers";
import useStorage from "../hooks/useStorage";
import { toast, ToastContainer } from "react-toastify";
import { createContext } from "react";
import CustomPagination from "../components/CustomPagination";

export const TypeContext = createContext();

export default function HomePage() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const { getStorageItem, setStorageItem } = useStorage();

  const searchHandler = (params) => {
    setType(params.type);
    setSearch(params.search);
    searchMovies(params.search, params.type, page);
  };

  const pageHandler = (newPage) => {
    setPage(newPage);
    searchMovies(search, type, newPage);
  };

  const searchMovies = async (search, type, page) => {
    if (!search || !type) return false;
    setInProgress(true);
    const storeKey =
      search.replaceAll(" ", "-").replaceAll("_", "-") +
      "_" +
      type +
      "_" +
      page;
    setStorageItem("storeKey", storeKey, "session");
    const cachedList = getStorageItem(storeKey, null, "session");
    if (cachedList) {
      setMovieList(cachedList.results);
      setTotalPages(cachedList.total_pages);
      setTotalItems(cachedList.total_results);
      // store.setMoviesList(cachedList.results);
      // store.setTotalPages(cachedList.total_pages);
      // store.setTotalResults(cachedList.total_results);
      setInProgress(false);
      return;
    }
    const url = `https://api.themoviedb.org/3/search/${type}?include_adult=false&language=en-US&page=${page}&query=${search}`;
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
        data.total_results && setStorageItem(storeKey, data, "session");
        data.total_results && setStorageItem("storeKey", storeKey, "session");
        setMovieList(data.results);
        setTotalPages(data.total_pages);
        setTotalItems(data.total_results);

        // store.setMoviesList(data.results);
        // store.setTotalPages(data.total_pages);
        // store.setTotalResults(data.total_results);
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

  const storedSearch = () => {
    const storeKey = getStorageItem("storeKey", null, "session");
    if (storeKey) {
      const cachedList = getStorageItem(storeKey, null, "session");
      if (cachedList) {
        // store.setMoviesList(data.results);
        // store.setTotalPages(data.total_pages);
        // store.setTotalResults(data.total_results);
        setMovieList(cachedList.results);
        setTotalPages(cachedList.total_pages);
        setTotalItems(cachedList.total_results);
        const [search, type, page] = storeKey.split("_");
        setSearch(search);
        setType(type);
        setPage(+page);
      }
    }
  };

  useEffect(() => {
    storedSearch();
  }, []);

  return (
    <>
      <TypeContext value={type}>
        {inProgress && <LoaderOverlay />}
        <Container className="pt-3">
          <SearchForm onSearch={searchHandler} />
          <MoviesList items={movieList} total={totalItems} />
          <CustomPagination
            onPageChange={pageHandler}
            page={page}
            total={totalPages}
          />
        </Container>
      </TypeContext>
    </>
  );
}
