import { Game } from "@/Types";
import React, { createContext, useContext, useState } from "react";

interface GameCardState {
  gameList: Game[];
  setGameList: React.Dispatch<React.SetStateAction<Game[]>>;
}

const GameContext = createContext<GameCardState | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameList, setGameList] = useState<Game[]>([]);
  return (
    <GameContext.Provider value={{ gameList, setGameList }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
