import React from 'react';
import PropTypes from 'prop-types';

import { Character } from '../../types';

import CharacterComponent from './character';

interface Props {
  characters: Character[];
}

function CharactersTable({ characters }: Props) {
  return (
    <table width="100%" className="characters-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Género</th>
          <th>Cultura</th>
          <th>Número de títulos</th>
        </tr>
      </thead>

      <tbody>
        <CharacterComponent characters={characters} />
      </tbody>
    </table>
  );
}

CharactersTable.propTypes = {
  characters: PropTypes.object.isRequired,
};

export default React.memo(CharactersTable);
