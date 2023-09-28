import { SimpleGrid, Text } from "@chakra-ui/react";
import useGame from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkelton from "./GameCardSkelton";
import useGames from "../hooks/useGames";

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
  const { data, error, isLoading } = useGames(); //Get data from the custom hook
  const Skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={10}
        spacing={10}
      >
        {isLoading &&
          Skeletons.map((skeleton) => <GameCardSkelton key={skeleton} />)}
        {data.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
