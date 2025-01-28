import axios from "axios";
const API_KEY = "jJ2qswjqS4rblDi4LhXExFKnNpHtm869y17s4VSFxlg";
const BASE_URL = "https://api.unsplash.com/search/photos";

const fetchImages = async (query, page = 1) => {
  const response = await axios(BASE_URL, {
    params: {
      query: query,
      page,
      per_page: 12,
      orientation: "portrait",
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export default fetchImages;
