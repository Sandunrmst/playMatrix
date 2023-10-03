import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkelton from "./GameCardSkelton";
import useGames from "../hooks/useGames";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
  // selectedGenre: Genre | null;
  // selectedPlatforms: Platform | null;
}

const GameGrid = ({
  /*selectedGenre, selectedPlatforms*/ gameQuery,
}: Props) => {
  const { data, error, isLoading } = useGames(gameQuery); //Get data from the custom hook
  const Skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  if (error) return <Text>{error}</Text>;
  return (
    /* {error && <Text>{error}</Text>} */
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      padding={10}
      spacing={6}
    >
      {isLoading &&
        Skeletons.map((skeleton) => <GameCardSkelton key={skeleton} />)}
      {data.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
