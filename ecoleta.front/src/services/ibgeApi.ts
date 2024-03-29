import axios from 'axios';

const ibgeApi = axios.create({
    baseURL: process.env.API_IBGE_URL || 'https://servicodados.ibge.gov.br/api/v1'
});

export default ibgeApi;