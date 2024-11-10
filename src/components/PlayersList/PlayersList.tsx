type Player = {
  name: string;
  score: number;
};

interface PlayersListProps {
  players: Player[];
}

const PlayersList = () => {
  return <div>PlayersList</div>;
};

export default PlayersList;
