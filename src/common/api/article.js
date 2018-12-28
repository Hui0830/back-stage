import axios from 'axios';

export const getArticleList = () => {
    return axios.get('/api/article/list');
}