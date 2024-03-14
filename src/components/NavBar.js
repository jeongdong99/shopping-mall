import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { GrLogin } from 'react-icons/gr';
import { IoLogOut } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../features/basket/isLoggedSlice';
import { setOpen } from '../features/basket/isModalOpenSlice';
import Modal from './Modal';

const NavBar = () => {
	const dispatch = useDispatch();
	const basketCount = useSelector((state) => state.basket.length);
	const isLoggedState = useSelector((state) => state.isLogged);
	const isModalOpenState = useSelector((state) => state.isModalOpen);
	// console.log(basketCount);
	const linkStyle = {
		textDecoration: 'none',
		color: 'inherit',
	};
	const handleModalOpen = () => {
		dispatch(setOpen());
	};

	return (
		<div style={{ position: 'relative' }}>
			<header>
				<Link
					to='/'
					style={linkStyle}>
					<h1 className='home'>Shop-It-Mall</h1>
				</Link>
				<div className='icon-container'>
					<div
						className='basket-container'
						style={{
							marginLeft: '10px',
							fontSize: '30px',
							position: 'relative',
						}}>
						{/* Prb11: When basketCount === 0, the box don't need to exist
					 => Sol: Using conditional operator with inline style*/}
						<div
							className='basket-count'
							style={{ display: basketCount ? 'flex' : 'none' }}>
							{basketCount === 0 ? null : basketCount}
						</div>
						<MdOutlineShoppingCart
							className='basket-icon'
							onClick={() => handleModalOpen()}
						/>
					</div>
					<Link
						to='/login'
						style={linkStyle}>
						<RxAvatar
							style={{ marginLeft: '10px', fontSize: '30px' }}
						/>
					</Link>
					{isLoggedState ? (
						<IoLogOut
							className='logout-icon'
							onClick={() => dispatch(logOut())}
							style={{ marginLeft: '10px', fontSize: '35px' }}
						/>
					) : (
						<GrLogin
							style={{ marginLeft: '10px', fontSize: '30px' }}
						/>
					)}
				</div>
			</header>

			{/* Prb17: modal z-index...  
			=> Sol: you need to keep it in mind that one's z-index counldn't be higher than parent's z-index */}
			{isModalOpenState && (
				<Modal
					style={{
						position: 'fixed',
						top: '50px', // Adjust this value to position the Modal as needed
						right: '-20px',
						transform: 'translateX(-50%)',
						zIndex: '1000',
						width: '300px',
						height: '500px',
						backgroundColor: 'white',
						borderRadius: '20px',
						boxShadow: '0 0 20px 3px rgba(0, 0, 0, 0.1)',
					}}
				/>
			)}
		</div>
	);
};

export default NavBar;
