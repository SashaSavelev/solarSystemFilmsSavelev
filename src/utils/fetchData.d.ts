import { Movie } from "../types";

export type Params = {
  limit: number;
  selectFields: string[];
  notNullFields: string[];
  'rating.kp': string;
  
};

export interface FetchDataResponse {
  docs: Movie[];
  pages: number;
  limit: number;
  total: number;
}

export default function fetchData(page?: number): Promise<FetchDataResponse>;
