import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { fetchAuthLogin } from "../redux/slices/authSlice";
import { selectIsAuth } from "../redux/slices/authSlice";

const FIELDS = {
	EMAIL: "email",
	PASSWORD: "password"
};

function Login() {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const isLoading = useSelector(state => state.auth.status === "loading");

	const { EMAIL, PASSWORD } = FIELDS;

	const [values, setValues] = React.useState({
		[EMAIL]: "",
		[PASSWORD]: ""
	});

	const [error, setError] = React.useState('');

	const handleChange = ({ target: { value, name } }) => {
		setError("");
		setValues({
			...values,
			[name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(fetchAuthLogin({ [EMAIL]: values[EMAIL], [PASSWORD]: values[PASSWORD] }));

		if (!data.payload) {
			return setError({ message: 'Неправильный логин или пароль' });
		};

		if ("token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token);
		};
	};

	if (isAuth) {
		return <Navigate to="/intensive" />
	};

	return (
		<div
			style={{ height: window.innerHeight }}
			className="wrapper"
		>
			{isLoading
				? <div>Загрузка</div>
				: <div className="login">
					<div className="login__text">
						<h1>Войдите, чтобы продолжить!</h1>
						<p>Данные для входа: должны были быть отправлены</p>
					</div>
					<form
						autoComplete="off"
						className="login__form login-form"
						onSubmit={handleSubmit}
					>
						<div className="login-form__input-border">
							<input
								placeholder="Адрес электронной почты"
								type="email"
								name="email"
								onChange={handleChange}
								value={values[EMAIL]}
								required
							/>
						</div>
						<div className="login-form__input-border">
							<input
								placeholder="Пароль"
								type="password"
								name="password"
								onChange={handleChange}
								value={values[PASSWORD]}
								required
							/>
						</div>
						{error && <div className="login__error">
							<span>{error.message}</span>
						</div>
						}
						<button
							className="login__button"
							type="submit"
						>
							Войти
						</button>
					</form>
				</div>
			}
		</div>
	);
};

export default Login;