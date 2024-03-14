import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Main from './pages/Main';
import { Route, Routes, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Basket from './pages/Basket';
import PaymentDone from './pages/PaymentDone';

// Navbar and Footer are default components to every page. Set the layout

const Layout = () => {
	return (
		<>
			<NavBar />
			<Outlet />
			<Footer />
		</>
	);
};
function App() {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<Layout />}>
					<Route
						index
						element={<Main />}
					/>
					<Route
						path=':productId'
						element={<Detail />}
					/>
					<Route
						path='login'
						element={<Login />}
					/>
					<Route
						path='basket'
						element={<Basket />}
					/>
					<Route
						path='payment'
						element={<PaymentDone />}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
