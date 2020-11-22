import { createContext } from "react";
import Player from "../types/player.interface";
import Sport from "../types/sport.interface";

export interface IPlayers {
  players: Sport[],
  selectedPlayer?: Player
};

export default createContext<IPlayers | null>(null);
