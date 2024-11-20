// import axios from "axios";

// // Create an Axios instance
// const api = axios.create({
//     baseURL: 'http://localhost:5000/api/image',
//     headers: { 'Content-Type': 'application/json' },
// });

// // Fetch all image
// export const fetchPictures = async () => {
//     const response = await api.get('/');
//     return response.data;
// };

// // Like a image
// export const likePicture = async (id: string) => {
//     const response = await api.post(`/${id}/like`);
//     return response.data;
// };

// // Follow/unfollow a image
// export const followPicture = async (id: string, userId: string) => {
//     const response = await api.post(`/${id}/follow`, { userId });
//     return response.data;
// };

// // Tag a image
// export const tagPicture = async (id: string, tags: string[]) => {
//     const response = await api.post(`/${id}/tag`, { tags });
//     return response.data;
// };

// export default api;



// Hardcoded Pinterest image data
const PinterestImage = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/enabled_lo_mid/474x/95/64/30/95643043987516215ec0c50de49ec5a3.jpg",
      likes: 0,
      followers: [],
      tags: [],
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/enabled_lo_mid/474x/5b/dc/10/5bdc1011d9eb8d138d3a04df8dcae3e3.jpg",
      likes: 0,
      followers: [],
      tags: [],
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/236x/81/0f/c6/810fc60a1125baea6fc5168185d6f6c6.jpg",
      likes: 0,
      followers: [],
      tags: [],
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/enabled_lo_mid/474x/95/64/30/95643043987516215ec0c50de49ec5a3.jpg",
      likes: 0,
      followers: [],
      tags: [],
    },
  ];
  
  export default PinterestImage;
  
