import { api } from './api';

const MOCK_PLANTS = [
  { id: 1, name: 'Monstera Deliciosa', scientific_name: 'Monstera deliciosa', category: 'Indoor', difficulty: 'Easy', image: 'https://picsum.photos/seed/monstera/800/600' },
  { id: 2, name: 'Snake Plant', scientific_name: 'Sansevieria trifasciata', category: 'Indoor', difficulty: 'Beginner', image: 'https://picsum.photos/seed/snakeplant/800/600' },
  { id: 3, name: 'Fiddle Leaf Fig', scientific_name: 'Ficus lyrata', category: 'Indoor', difficulty: 'Moderate', image: 'https://picsum.photos/seed/fiddleleaf/800/600' },
  { id: 4, name: 'Lavender', scientific_name: 'Lavandula', category: 'Outdoor', difficulty: 'Easy', image: 'https://picsum.photos/seed/lavender/800/600' },
  { id: 5, name: 'Tomato', scientific_name: 'Solanum lycopersicum', category: 'Vegetable', difficulty: 'Moderate', image: 'https://picsum.photos/seed/tomato/800/600' },
  { id: 6, name: 'Aloe Vera', scientific_name: 'Aloe barbadensis miller', category: 'Succulent', difficulty: 'Easy', image: 'https://picsum.photos/seed/aloe/800/600' },
];

export const plantService = {
  getAll: async () => {
    try {
      // return await api.get('/api/plants');
      return MOCK_PLANTS;
    } catch (error) {
      console.error('Error fetching plants:', error);
      return MOCK_PLANTS;
    }
  },
  getById: async (id) => {
    try {
      // return await api.get(`/api/plants/${id}`);
      return MOCK_PLANTS.find(p => p.id === parseInt(id)) || null;
    } catch (error) {
      console.error(`Error fetching plant ${id}:`, error);
      return null;
    }
  },
};
