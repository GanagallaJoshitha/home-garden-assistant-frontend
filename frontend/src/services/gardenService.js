import { api } from './api';

const MOCK_GARDEN = [
  { id: 1, name: 'Monstera', health: 85, progress: 65, status: 'Healthy', last_watered: '2 days ago', needs_water: false },
  { id: 2, name: 'Snake Plant', health: 95, progress: 40, status: 'Excellent', last_watered: '1 week ago', needs_water: true },
  { id: 3, name: 'Fiddle Leaf', health: 60, progress: 80, status: 'Needs Attention', last_watered: 'Yesterday', needs_water: false },
];

const MOCK_REMINDERS = [
  { id: 1, plant_name: 'Monstera', time: 'Today, 2:00 PM', amount: '500ml', status: 'pending' },
  { id: 2, plant_name: 'Snake Plant', time: 'Today, 4:30 PM', amount: '200ml', status: 'pending' },
  { id: 3, plant_name: 'Aloe Vera', time: 'Tomorrow, 10:00 AM', amount: '150ml', status: 'pending' },
  { id: 4, plant_name: 'Pothos', time: 'Tomorrow, 11:00 AM', amount: '300ml', status: 'pending' },
];

export const gardenService = {
  getGarden: async () => {
    try {
      // return await api.get('/api/garden');
      return MOCK_GARDEN;
    } catch (error) {
      console.error('Error fetching garden:', error);
      return MOCK_GARDEN;
    }
  },
  getReminders: async () => {
    try {
      // return await api.get('/api/reminders');
      return MOCK_REMINDERS;
    } catch (error) {
      console.error('Error fetching reminders:', error);
      return MOCK_REMINDERS;
    }
  },
  createReminder: async (reminder) => {
    try {
      // return await api.post('/api/reminders', reminder);
      return { ...reminder, id: Date.now(), status: 'pending' };
    } catch (error) {
      console.error('Error creating reminder:', error);
      throw error;
    }
  },
};
