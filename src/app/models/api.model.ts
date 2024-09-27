export interface ResourceBase {
  name: string;
  url: string;
}

export interface EntityBase {
  id: number;
}

export interface Location extends ResourceBase {
  type: string;
  dimension: string;
  residents: string[];
}

export interface Episode extends ResourceBase {
  air_date: string;
  episode: string;
  characters: string[];
}

export interface Info<T> {
  /**
   * The API will automatically paginate the responses. I will receive up to `20` documents per page.
   */
  info: {
    /** The length of the response */
    count: number;
    /** The amount of pages */
    pages: number;
    /** Link to the next page (if it exists) */
    next: string | null;
    /** Link to the previous page (if it exists) */
    prev: string | null;
  };
  results: T[];
}
