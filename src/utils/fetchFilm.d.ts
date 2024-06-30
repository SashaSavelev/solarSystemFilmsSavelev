export interface Person {
    id: number;
    photo: string;
    name: string ;
    enName: string | null;
    description: string | null;
    profession: string;
    enProfession: string;
  }
  
  export interface Genre {
    name: string;
  }
  
  export interface Country {
    name: string;
  }
  
  export interface Rating {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number | null;
  }
  
  export interface Votes {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number | null;
  }
  
  export interface ReleaseYear {
    start: number;
    end: number | null;
  }
  
  export interface Network {
    name: string;
  }
  
  export interface Networks {
    items: Network[];
  }
  
  export interface Poster {
    previewUrl: string;
    url: string;
  }
  
  export interface FetchFilmResponse {
    id: number;
    name: string;
    alternativeName: string;
    type: string;
    typeNumber: number;
    year: number;
    description: string;
    shortDescription: string | null;
    slogan: string | null;
    status: string | null;
    rating: Rating;
    votes: Votes;
    movieLength: number | null;
    totalSeriesLength: number | null;
    seriesLength: number | null;
    ratingMpaa: string | null;
    ageRating: number | null;
    genres: Genre[];
    countries: Country[];
    persons: Person[];
    premiere: {
      country: string | null;
      russia: string | null;
      cinema: string | null;
      bluray: string | null;
      dvd: string | null;
    };
    releaseYears: ReleaseYear[];
    top10: number | null;
    top250: number | null;
    isSeries: boolean;
    ticketsOnSale: boolean;
    lists: string[];
    networks: Networks;
    createdAt: string;
    updatedAt: string;
    poster: Poster;
  }
  