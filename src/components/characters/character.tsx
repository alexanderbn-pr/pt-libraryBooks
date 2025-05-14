import React from 'react';
import PropTypes from 'prop-types';

import { type Character } from '../../types';

interface Props {
  characters: Character[];
}

const CharacterComponent = ({ characters }: Props) => {
  return (
    <>
      {characters.map((character: Character) =>
        character.name ? (
          <tr key={character.url}>
            <td>{character.name || 'Desconocido'}</td>
            <td>{character.gender}</td>
            <td>{character.culture || 'Desconocido'}</td>
            <td>{character.titles.length}</td>
          </tr>
        ) : null,
      )}
    </>
  );
};

CharacterComponent.propTypes = {
  characters: PropTypes.array.isRequired,
};
export default React.memo(CharacterComponent);
