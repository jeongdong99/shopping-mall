import React from 'react';
import './Basket.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import {
	basketDelete,
	countUp,
	countDown,
	emptyBasket,
} from '../features/basket/basketSlice';

// I have to bring unique value from store. Now the same products was added repeatedly
const Basket = () => {
	const basketState = useSelector((state) => state.basket);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	console.log(basketState);

	const handleRemoveItem = (id) => {
		dispatch(basketDelete({ id }));
	};
	const handleCountDown = (id) => {
		dispatch(countDown({ id }));
	};
	const handleCountUp = (id) => {
		dispatch(countUp({ id }));
	};
	const handleBuy = () => {
		dispatch(emptyBasket());
		navigate('/payment');
	};
	const totalExpense = basketState.reduce(
		(total, item) => total + parseFloat(item.price) * item.count,
		0
	);

	return (
		<div className='basket-container'>
			<div className='basket-title-container'>
				<h1 className='basket-title'>Basket</h1>
			</div>
			<div className='basket-list-container'>
				<ul className='basket-list'>
					{basketState.map((item) => (
						<>
							<div
								className='basket-list-item-container'
								key={item.id}>
								<div className='item-container'>
									<div className='img-container'>
										<img
											className='item-image'
											src={item.image}
											alt='product'
										/>
									</div>
									<div className='item-info'>
										<span className='item-category'>
											{item.category}
										</span>
										<span className='item-title'>
											{item.title}
										</span>
										<span className='item-price'>
											{`$ ${item.price} X ${
												item.count
											} = $ ${(
												parseFloat(item.price) *
												parseInt(item.count)
											).toLocaleString()}`}
										</span>
									</div>
								</div>
								<div className='item-counter-container'>
									<button
										className='count-down'
										onClick={() => {
											handleCountDown(item.id);
										}}>
										-
									</button>
									<span className='count-result'>
										{item.count}
									</span>
									<button
										className='count-up'
										onClick={() => {
											handleCountUp(item.id);
										}}>
										+
									</button>
								</div>
								<div className='item-delete-button-container'>
									<button
										className='item-delete-button'
										onClick={() =>
											handleRemoveItem(item.id)
										}>
										<MdOutlineDelete />
									</button>
								</div>
							</div>
							<hr />
						</>
					))}
				</ul>
			</div>
			<div className='calculation-result-with-buy-btn'>
				<div className='expense-calculator-container'>
					<div>Total Expense: $ {totalExpense.toLocaleString()}</div>
				</div>
				<div className='buy-btn-container'>
					<button
						className='buy-btn'
						onClick={() => {
							handleBuy();
						}}>
						Buy
					</button>
				</div>
			</div>
		</div>
	);
};

export default Basket;
