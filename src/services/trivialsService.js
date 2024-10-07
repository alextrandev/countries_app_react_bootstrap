import axios from 'axios';
import { toast } from 'react-toastify';

const fetchTrivials = async (cca3) => {
  try {
    const response = await axios.get(`/api/fetch-trivials?cca3=${cca3}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trivials:', error);
    toast.error(error.message);
    throw error;
  }
};

export default fetchTrivials;