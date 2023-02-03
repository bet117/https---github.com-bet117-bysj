import axios from 'axios';
export const login=params=>axios.get('/login',{params})