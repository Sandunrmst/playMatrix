import { Text } from "@chakra-ui/react";
import useGame from "../hooks/useGames";

// interface Game {
//   id: number;
//   name: string;
// }

// interface FetchGamesData {
//   count: number;
//   results: Game[];
// }

const GameGrid = () => {
  //   const [games, setGames] = useState<Game[]>([]);
  //   const [error, setError] = useState("");

  //   useEffect(() => {
  //     apiClient
  //       .get<FetchGamesData>("/games")
  //       .then((res) => setGames(res.data.results))
  //       .catch((err) => setError(err.message));
  //   }, []);
  const { games, error } = useGame(); //Get data from the custom hook

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
