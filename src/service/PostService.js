import config from "../config/constant";
import axios from 'axios'

const fetchPosts = async (tag, page) => {
  const response = await axios.get(config.api.base_url + config.api.endpoint, { params: { tags: tag, page: page } });
  return response.data
}

export default fetchPosts;