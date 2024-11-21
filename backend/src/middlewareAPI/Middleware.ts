import axios from "axios";

const API_KEY = `14781496-028f47095b4aea6c3f8abe40f`;
const Pinterest_API = `https://pixabay.com/api/`;

export const fetchPinterestImages = async (query: string = "nature") => {
  try {
    const response = await axios.get(Pinterest_API, {
      params: {
        key: API_KEY,
        q: query, 
        image_type: "photo",
        per_page: 20, 
      },
    });
    return response.data.hits; 
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error}`);
  }
};
