import { api } from './api';

const MOCK_POSTS = [
  { 
    id: 1, 
    user: 'GreenThumb_Alice', 
    content: 'Just harvested my first batch of organic tomatoes! 🍅 The taste is incomparable to store-bought.', 
    likes: 42, 
    liked: false,
    comments: [
      { id: 1, user: 'PlantDad_Joe', text: 'Those look amazing! What variety are they?' },
      { id: 2, user: 'Sarah_Bloom', text: 'I wish mine grew that well this year.' }
    ], 
    time: '2h ago', 
    image: 'https://picsum.photos/seed/tomatoes/800/600' 
  },
  { 
    id: 2, 
    user: 'PlantDad_Joe', 
    content: 'Anyone have tips for getting rid of fungus gnats? They are taking over my indoor garden. 🆘', 
    likes: 12, 
    liked: true,
    comments: [
      { id: 3, user: 'UrbanJungle', text: 'Try using yellow sticky traps and letting the soil dry out completely.' }
    ], 
    time: '5h ago' 
  },
  { 
    id: 3, 
    user: 'UrbanJungle', 
    content: 'My living room is finally looking like a rainforest. 🌿 15 plants and counting!', 
    likes: 156, 
    liked: false,
    comments: [], 
    time: '1d ago', 
    image: 'https://picsum.photos/seed/jungle/800/600' 
  },
];

export const communityService = {
  getPosts: async () => {
    try {
      // return await api.get('/api/posts');
      return MOCK_POSTS;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return MOCK_POSTS;
    }
  },
  createPost: async (post) => {
    try {
      // return await api.post('/api/posts', post);
      return { ...post, id: Date.now(), time: 'Just now', likes: 0, liked: false, comments: [] };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  likePost: async (postId) => {
    try {
      // return await api.post(`/api/posts/${postId}/like`);
      return true;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },
};
