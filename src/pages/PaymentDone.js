import React from 'react';
import { GiBasket } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const PaymentDone = () => {
	return (
		<div className='payment-done-container'>
			<GiBasket />
			<h1>Empty Basket</h1>
			<Link to='/'>
				<span>Keep Shopping</span>
			</Link>
		</div>
	);
};

export default PaymentDone;
