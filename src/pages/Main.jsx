import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { logOut, selectIsAuth } from "../redux/slices/authSlice";

function Main() {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const user = useSelector(state => state.auth.data);

	if (!isAuth) {
		return <Navigate to="/login" />
	}

	function signOut() {
		dispatch(logOut());
		window.localStorage.removeItem("token");
	};

	return (
		<div style={{ height: window.innerHeight }} className="wrapper">
			<div className="user">
				<div className="user__avatar">
					<img alt="avatat" src={user.avatar} />
				</div>
				<div className="user__text">
					<h1><span>Login:</span>{user.login}</h1>
					<p><span>Email:</span> {user.email} </p>
				</div>
				<div className="user__button">
					<button onClick={signOut} className="user__signOut">
						Выйти
					</button>
				</div>
			</div>
		</div>
	);
};

export default Main;