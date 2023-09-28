import {useState, useEffect} from "react"
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


interface FetchResponse <T>{
    count: number;
    results: T[];
}


const useData = <T> (endpoint: string)=> {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
        const contraller = new AbortController(); //This use for cancelling unwanted user requests
      
      setLoading(true)
        apiClient
        .get<FetchResponse<T>>(endpoint, {signal: contraller.signal})
        .then((res) => {
          setData(res.data.results) 
          setLoading(false)
        })
        .catch((err) => {
          if(err instanceof CanceledError) return;
          setError(err.message)
          setLoading(false)
        });

        return () => contraller.abort() //set cleanup function 
    }, []);

    return {data, error, isLoading}
}

export default useData