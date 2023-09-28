import {useState, useEffect} from "react"
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
    id: number;
    name: string;
}

interface FetchGenresResponse{
    count: number;
    results: Genre[];
}


const useGenres = ()=> {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
        const contraller = new AbortController(); //This use for cancelling unwanted user requests
      
      setLoading(true)
        apiClient
        .get<FetchGenresResponse>("/genres", {signal: contraller.signal})
        .then((res) => {
          setGenres(res.data.results) 
          setLoading(false)
        })
        .catch((err) => {
          if(err instanceof CanceledError) return;
          setError(err.message)
          setLoading(false)
        });

        return () => contraller.abort() //set cleanup function 
    }, []);

    return {genres, error, isLoading}
}

export default useGenres