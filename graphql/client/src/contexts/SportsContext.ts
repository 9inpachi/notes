import { createContext } from "react";
import Sport from "../types/sport.interface";

export interface ISports {
  sports: Sport[],
  selectedSport?: Sport
};

export default createContext<ISports | null>(null);
