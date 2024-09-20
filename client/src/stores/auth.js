import { writable } from 'svelte/store';

const storedToken = localStorage.getItem('token');
export const authToken = writable(storedToken);