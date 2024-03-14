import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { basketAdd } from '../features/basket/basketSlice';
import './Main.css';

const Main = () => {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('all');
	// Prb1: infinite re-rendering => Sol: input empty dependency array
	const navigate = useNavigate();

	useEffect(() => {
		fetchProduct();
	}, []);

	const handleAddProduct = (id, category, image, title, price) => {
		dispatch(basketAdd({ id, category, image, title, price }));
	};

	const fetchProduct = async () => {
		try {
			const request = await axios.get();
			// Prb3: map method not able to read 1 obj => Sol: using slice and take array with one obj inside
			setProducts(request.data /* .slice(1, 2) */); // log: products array(category, description, id, image-url, price, rating, title) * Don't forget these are all str values
			// console.log('products', request.data);
		} catch (error) {
			console.error('Error: fetching products', error);
		}
		return true;
	};
	// !Study the flow of filtering the products based on the filtering...
	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	const categoryArray = [
		'all',
		'electronics',
		'jewelery',
		"men's clothing",
		"women's clothing",
	];

	// Prb4: when only All and Electronics category clicked, the Main page show me the products =>
	// Sol: check if the compared category matches the real category name;
	const filteredProducts =
		selectedCategory === 'all'
			? products
			: products.filter(
					(product) => product.category === selectedCategory
			  );

	return (
		// Prb7: after successfully logging in, and redirected to main page, the redering speed is shit. =>
		// Sol: thinking...
		<section>
			<h1>Products</h1>
			<div className='category-container'>
				{categoryArray.map((category) => (
					<span
						key={category}
						className={`category ${
							selectedCategory === category ? 'active' : ''
						}`}
						onClick={() => handleCategoryClick(category)}>
						{category}
					</span>
				))}
			</div>
			{/* rendering card with img, title, $ price */}
			{/* Prb2: crazy css. too many product. => Sol: take just one and map it all */}
			<ul className='products-table'>
				{filteredProducts.map((product) => (
					<div
						className='product'
						key={product.id}>
						<div className='img-container'>
							<img
								onClick={() => navigate(`/${product.id}`)}
								src={product.image}
								alt='product'
							/>
						</div>
						<span className='truncate'>{product.title}</span>
						<div className='button-price-container'>
							{/* Prb10: after click the below button, the page moves to detail page
							 => Sol: */}
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
							<span>{`$ ${product.price}`}</span>
						</div>
					</div>
				))}
			</ul>
		</section>
	);
};

export default Main;

// Prb9: In the browser dev tool, I've repeatedly got this error message below.
/* Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, 
but the message channel closed before a response was received */
// Sol: check the same problem in the stackoverflow. Finding...
