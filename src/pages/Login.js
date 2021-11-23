import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

function Login() {
	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const isInvalid = password === "" || emailAddress === "";

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			await firebase
				.auth()
				.signInWithEmailAndPassword(emailAddress, password);
			history.push(ROUTES.DASHBOARD);
		} catch (error) {
			setEmailAddress("");
			setPassword("");
			setError(error.message.slice(9, -1) + `, Try again`);
		}
	};

	useEffect(() => {
		document.title = "Login • Instagram";
	}, []);

	return (
		<div className="container flex mx-auto max-w-screen-md lg:items-center justify-center sm:h-screen">
			<div className="flex lg:w-3/5">
				<img
					className="iphone max-w-full"
					src="/images/iphone.jpg"
					alt="iphone"
				/>
			</div>
			<div className="flex flex-col md:w-2/5 sm: w-72 sm: mt-40 lg: mb-40">
				<div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded mb-4">
					<h1 className="flex justify-center w-full mb-3">
						<img
							src="/images/logo.png"
							alt="logo"
							className="mt-2 w-6/12"
						/>
					</h1>
					{error && (
						<p className="mb-4 text-xs text-red-primary">{error}</p>
					)}

					<form onSubmit={handleLogin} method="POST">
						<input
							type="text"
							value={emailAddress}
							aria-label="Enter your Email Address"
							placeholder="Email Address"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
							onChange={({ target }) =>
								setEmailAddress(target.value)
							}
						/>
						<input
							type="Password"
							value={password}
							aria-label="Enter your Password"
							placeholder="Password"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
							onChange={({ target }) => setPassword(target.value)}
						/>

						<button
							disabled={isInvalid}
							className={`bg-blue-medium text-white w-full rounded h-8 font-bold
							${isInvalid && "opacity-50"}`}
							type="submit"
							onClick={handleLogin}
						>
							Log In
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center flex-col w-full rounded bg-white p-4 border border-gray-primary">
					<p className="text-sm">
						Don't have an account?{" "}
						<Link
							to={ROUTES.SIGN_UP}
							className="font-bold text-blue-medium"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
