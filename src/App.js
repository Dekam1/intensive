import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchAuthMe } from './redux/slices/authSlice';

import './styles/index.scss';

import Login from './pages/Login';
import Main from './pages/Main';

function App() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(fetchAuthMe());
	}, [dispatch]);


	return (
		<Routes>
			<Route path='/intensive' element={<Main />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
}

export default App;
