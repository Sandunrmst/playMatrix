import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  name: string;
  slug: string
}
export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform } [] //Array of objects according to API
    metacritic: number;
  }
  
  interface FetchGamesData {
    count: number;
    results: Game[];
  }

const useGame = ()=> {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
        const contraller = new AbortController(); //This use for cancelling unwanted user requests
      
      setLoading(true)
        apiClient
        .get<FetchGamesData>("/games", {signal: contraller.signal})
        .then((res) => {
          setGames(res.data.results) 
          setLoading(false)
        })
        .catch((err) => {
          if(err instanceof CanceledError) return;
          setError(err.message)
          setLoading(false)
        });

        return () => contraller.abort() //set cleanup function 
    }, []);

    return {games, error, isLoading}
}

export default useGame