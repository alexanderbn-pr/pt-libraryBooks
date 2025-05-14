import './sortFilters.scss';

import PropTypes from 'prop-types';

import { SortBy, SortOption } from '../../types';

interface Props {
  isSortedAsc: boolean;
  sorting: SortBy;
  toggleSortBy: (newSortingValue: SortBy) => void;
  sortOptions: SortOption[];
}

const SortFilters = ({
  isSortedAsc,
  sorting,
  toggleSortBy,
  sortOptions,
}: Props) => {
  return (
    <div
      role="toolbar"
      aria-label="Opciones de ordenación"
      className="sort-filters"
    >
      {sortOptions.map((sortOption) => (
        <button
          key={sortOption.value}
          onClick={() => toggleSortBy(sortOption.value)}
        >
          {sortOption.label}
          {sorting === sortOption.value && (
            <span className="sort-icon" aria-hidden="true">
              {isSortedAsc ? ' ↑' : ' ↓'}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

SortFilters.propTypes = {
  isSortedAsc: PropTypes.bool.isRequired,
  sorting: PropTypes.string.isRequired,
  toggleSortBy: PropTypes.func.isRequired,
  sortOptions: PropTypes.object.isRequired,
  showFavorites: PropTypes.bool.isRequired,
  toggleShowFavorites: PropTypes.func.isRequired,
};

export default SortFilters;
