import { createContext } from "react";
import Sport from "../types/sport.interface";

export interface ISports {
  sports?: Sport[],
  selectedSportId?: string,
  setSelectedSportId?: (value: string) => void
};

export default createContext<ISports>({});
