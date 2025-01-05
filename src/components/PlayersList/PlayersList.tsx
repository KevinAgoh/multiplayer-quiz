import { Player } from '../../types/game';

interface PlayersListProps {
  players: Player[];
}

const PlayersList = ({ players }: PlayersListProps) => {
  return <div>{players.map(player => player.name)}</div>;
};

export default PlayersList;
