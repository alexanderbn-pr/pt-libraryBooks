export const fetchCharacters = async ({
  pageParam = 1,
  numCharacters = 20,
}) => {
  return await fetch(
    `https://anapioficeandfire.com/api/characters?page=${pageParam}&pageSize=${numCharacters}`,
  )
    .then((res) => {
      if (!res.ok) throw new Error('Error al obtener los personajes');
      return res?.json();
    })
    .then((res) => {
      const nextCursor = pageParam > 5 ? undefined : pageParam + 1;
      return {
        nextCursor,
        characters: res,
      };
    });
};
