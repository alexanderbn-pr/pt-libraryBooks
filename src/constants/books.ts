import { SortBy, SortOption } from '../types.d';

export const SORT_OPTIONS: SortOption[] = [
  { value: SortBy.NAME, label: 'Ordenar por nombre' },
  { value: SortBy.CHARACTERS, label: 'Ordenar por capítulos' },
  { value: SortBy.PAGES, label: 'Ordenar por páginas' },
];
