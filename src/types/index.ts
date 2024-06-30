
export interface Rating {
    kp: number;
    imdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
  }
  
  export interface Poster {
    url: string;
    previewUrl: string;
  }
  
  export interface Genre {
    name: string;
    slug: string;
  }
  
  export interface Movie {
    name: string;
    id: number;
    year: number;
    rating: Rating;
    genres: Genre[];
    poster: Poster;
  }
  
 export interface FilterProps {
    'genres.name'?: string[];
    'rating.kp'?: string;
    year?: string;
}