import './search.scss';

import PropTypes from 'prop-types';

interface Props {
  valueSearch: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  search: () => void;
}

const Search = ({ valueSearch, setValue, search }: Props) => {
  return (
    <section className="search">
      <article className="search-container">
        <h4>Buscador de libros:</h4>
        <input
          type="text"
          placeholder="Buscar libro"
          value={valueSearch}
          onChange={(e) => setValue(e.target.value)}
          className="search-input"
          aria-label="Buscar libro"
        />
      </article>
      <button onClick={search}>Actualizar libros</button>
    </section>
  );
};

Search.propTypes = {
  valueSearch: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default Search;
