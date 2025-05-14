import { toInteger } from 'lodash';

declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}
export interface Book {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  characters: string[];
  country: string;
  mediaType: string;
  numberOfPages: number;
  povCharacters: string[];
  publisher: string;
  released: string;
}

export type BooksResponse = Book[];

export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  CHARACTERS = 'characters',
  PAGES = 'numberOfPages',
}

export interface SortOption {
  value: SortBy;
  label: string;
}

export interface Character {
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}
