import { api } from './api';

const MOCK_ENTRIES = [
  { id: 1, title: 'New Growth!', content: 'My Monstera just put out a massive new leaf with beautiful fenestrations. So excited!', plant_name: 'Monstera', created_at: '2024-02-20T10:00:00Z', image_url: 'https://picsum.photos/seed/monstera/800/600' },
  { id: 2, title: 'Repotting Day', content: 'Finally moved the Snake Plant into a larger terracotta pot. The roots were definitely getting crowded.', plant_name: 'Snake Plant', created_at: '2024-02-15T14:30:00Z' },
  { id: 3, title: 'Pest Alert', content: 'Found some spider mites on the Pothos. Started treatment with neem oil today. Fingers crossed!', plant_name: 'Pothos', created_at: '2024-02-10T09:00:00Z' },
];

export const journalService = {
  getAll: async () => {
    try {
      // return await api.get('/api/journal');
      return MOCK_ENTRIES;
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      return MOCK_ENTRIES;
    }
  },
  create: async (entry) => {
    try {
      // return await api.post('/api/journal', entry);
      return { ...entry, id: Date.now(), created_at: new Date().toISOString() };
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw error;
    }
  },
};
