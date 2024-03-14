// dispatched from NavBar, after clicking the avatar
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {
	auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from './filebase'; // Adjust the path accordingly
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../features/basket/isLoggedSlice';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	// const [isLogged, setIsLogged] = useState(false);
	const isLoggedState = useSelector((state) => state.isLogged);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleCreateAccount = async () => {
		try {
			setErrorMsg('');
			await createUserWithEmailAndPassword(auth, email, password);
			setEmail('');
			setPassword('');
		} catch (err) {
			//console.log(err.code);
			switch (err.code) {
				case 'auth/weak-password':
					setErrorMsg('More than 6 digits');
					break;
				case 'auth/invalid-email':
					setErrorMsg('Wrong E-Mail Address');
					break;
				case 'auth/email-already-in-use':
					setErrorMsg('Alreay Registed Account');
					break;
				default:
					setErrorMsg('Logging-In Error');
			}
			alert(errorMsg);
		}
	};

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// Prb15: got true value when tried login twice. Make it happen at once
			dispatch(logIn());
			console.log('Logged in successfully');
			console.log(isLoggedState);

			navigate('/');
		} catch (error) {
			console.error('Error logging in:', error.message);
		}
	};

	return (
		<div className='log-in-card-container'>
			<div className='log-in-card'>
				<h2>Login</h2>
				<form className='log-in-form'>
					<label>Email</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label>Password</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button
						type='button'
						onClick={handleCreateAccount}>
						Create
					</button>
					<button
						type='button'
						onClick={handleLogin}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
