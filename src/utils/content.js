export const loadContent = async (section) => {
  try {
    const response = await fetch(`/content/${section}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error loading ${section} content:`, error);
    return null;
  }
}; 