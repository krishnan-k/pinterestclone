import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api/imagerouter',
    headers: { 'Content-Type': 'application/json' },
});

// Fetch all image
export const fetchPictures = async () => {
    const response = await api.get('/');
    return response.data;
};

// Like a image
export const likePicture = async (id: string) => {
    const response = await api.post(`/${id}/like`);
    return response.data;
};

// Follow/unfollow a image
export const followPicture = async (id: string, userId: string) => {
    const response = await api.post(`/${id}/follow`, { userId });
    return response.data;
};

// Tag a image
export const tagPicture = async (id: string, tags: string[]) => {
    const response = await api.post(`/${id}/tag`, { tags });
    return response.data;
};

export default api;
