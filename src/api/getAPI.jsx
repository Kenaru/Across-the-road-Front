import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getprezOnline = async () =>{
   try{
       const response = await axios api.get('api/CountprezOnline')
       return response.data
   }catch (error) {
       throw new Error('Failed to log in.');
   }

}