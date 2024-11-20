import axios from "axios";

const API_KEY = `14781496-028f47095b4aea6c3f8abe40f`;
const Pinterest_API = `https://pixabay.com/api/`;

export const fetchPinterestImages = async (query: string = "nature") => {
  try {
    const response = await axios.get(Pinterest_API, {
      params: {
        key: API_KEY,
        q: query, // Specify the search term
        image_type: "photo", // Optional: filter image types
        per_page: 20, // Optional: number of results per page
      },
    });
    return response.data.hits; // Pixabay returns images in the `hits` array
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error}`);
  }
};
