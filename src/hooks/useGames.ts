import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
    id: number;
    name: string;
  }
  
  interface FetchGamesData {
    count: number;
    results: Game[];
  }

const useGame = ()=> {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
        const contraller = new AbortController(); //This use for cancelling unwanted user requests
      apiClient
        .get<FetchGamesData>("/games", {signal: contraller.signal})
        .then((res) => setGames(res.data.results))
        .catch((err) => setError(err.message));

        return () => contraller.abort() //set cleanup function 
    }, []);

    return {games, error}
}

export default useGame