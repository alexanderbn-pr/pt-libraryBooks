import './charactersList.scss';

import CharactersTable from '../../components/characters/charactersTable';

import { useCharacters } from '../../hooks/useCharacters';

function CharactersList() {
  const {
    isLoading,
    isFetchingNextPage,
    isError,
    characters,
    fetchNextPage,
    hasNextPage,
  } = useCharacters();

  return (
    <main className="characters">
      {characters.length > 0 && <CharactersTable characters={characters} />}

      {(isLoading || isFetchingNextPage) && (
        <p>
          <strong>Cargando...</strong>
        </p>
      )}

      {isError && <p>Ha habido un error</p>}

      {!isLoading && !isError && characters.length === 0 && (
        <p>No hay personajes</p>
      )}

      {!isLoading && !isError && hasNextPage === true && (
        <div className="characters-results">
          <button
            onClick={() => {
              fetchNextPage();
            }}
          >
            Cargar más resultados
          </button>
        </div>
      )}

      {!isLoading && !isError && hasNextPage === false && (
        <p>No hay más resultados</p>
      )}
    </main>
  );
}

export default CharactersList;
