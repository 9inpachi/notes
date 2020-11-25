import { createContext } from "react";
import Sport from "../types/sport.interface";

export interface ISports {
  sports?: Sport[],
  setSports?: (sports: Sport[]) => void,
  selectedSportId?: string,
  setSelectedSportId?: (value: string) => void
};

export default createContext<ISports>({});
