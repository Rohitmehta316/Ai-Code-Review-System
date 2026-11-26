import axios from 'axios';
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:5000/api',timeout:90000});
api.interceptors.request.use(config=>{const token=localStorage.getItem('review_token');if(token)config.headers.Authorization=`Bearer ${token}`;return config;});
api.interceptors.response.use(r=>r,e=>{if(e.response?.status===401){localStorage.removeItem('review_token');if(!['/login','/register'].includes(location.pathname))location.assign('/login');}return Promise.reject(e);});
export const getError=e=>e?.response?.data?.message||e?.message||'Something went wrong. Please try again.';
