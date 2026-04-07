const API_URL = 'https://api.example.com/characters';

export const getAllCharacters = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all characters:', error);
    throw error;
  }
};
