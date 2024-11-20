import axios from "axios";

const ACCESS_TOKEN = `46855397-452aeca6183152b79c2f94477`
const Pinterest_API = `https://pixabay.com/api/?key=${ACCESS_TOKEN}`


export const PinterestImage = async () => {
  try {
    const response = await axios.get(`${Pinterest_API}/me/pins`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch images`);
  }
};
