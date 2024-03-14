import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { basketAdd } from '../features/basket/basketSlice';
import axios from '../api/axios';
import './Detail.css';

const Detail = () => {
	const { productId } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState([]);

	const dispatch = useDispatch();
	const handleAddProduct = (id, category, image, title, price) => {
		dispatch(basketAdd({ id, category, image, title, price }));
	};
	console.log(useSelector((state) => state.basket));
	// Prb7: when using useEffect, need to use arrow? if then, why? =>
	// Sol: just do it first. Then think.
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(`/${productId}`);
			// console.log(request);
			setProduct(request.data);
		}
		fetchData();
	}, [productId]);

	return (
		<div className='product-container'>
			<div className='product-img-container'>
				<img
					className='product-img'
					src={product.image}
					alt='product'
				/>
			</div>
			<div className='product-info-container'>
				<div className='product-info'>
					<span>{product.category}</span>
					<span>{product.title}</span>
					<span>{`$ ${product.price}`}</span>
					<p>{product.description}</p>
				</div>
				<div className='basket-buttons'>
					<button
						onClick={() =>
							handleAddProduct(
								product.id,
								product.category,
								product.image,
								product.title,
								product.price
							)
						}>
						Add to Basket
					</button>
					{/* Prb14: I got an error message like this: You should call navigate() in a React.useEffect(), not when your component is first rendered
					 => Sol: Change the form of function to arrow function.
					 This problem was resolved with stackoverflow searching. It was pretty self-explanatory problem. 
					 Not calling navigate function when the component is rendered means that I need to call navigate when buttons clicked.
					 But first when rendered navigate was activated. It needed buffered place. */}
					<button onClick={() => navigate('/basket')}>
						Go to Basket
					</button>
				</div>
			</div>
		</div>
	);
};

export default Detail;
