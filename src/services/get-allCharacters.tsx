// Delay artificial para testing de Suspense (remover en producción)
const SIMULATE_DELAY = 10000; // 10 segundos

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAllCharacters = async () => {
  // Simular delay de red para ver los fallbacks
  await delay(SIMULATE_DELAY);
  
  return await fetch(
    `https://anapioficeandfire.com/api/characters?pageSize=200`,
  )
    .then((res) => {
      if (!res.ok) throw new Error('Error al obtener los personajes');
      return res?.json();
    })
};
