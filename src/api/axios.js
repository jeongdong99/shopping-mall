import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://fakestoreapi.com/products',
	params: {
		language: 'ko-KR',
	},
});

export default instance;
