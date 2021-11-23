import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import ModalPost from "./components/ModalPost";
import useAuthListener from "./hooks/use-auth-listener";
import ProtectedRoute from "./helpers/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const SuggestionPage = lazy(() => import("./pages/SuggestionPage"));

function App() {
	const { user } = useAuthListener();
	return (
		<UserContext.Provider value={{ user }}>
			<div className="App">
				<Router>
					<Suspense
						fallback={
							<div className="flex h-screen items-center justify-center">
								<img
									className="w-10 h-10"
									src="/images/loading.png"
									alt="loading"
								/>
							</div>
						}
					>
						<Switch>
							<Route path={ROUTES.LOGIN} component={Login} />
							<Route path={ROUTES.SIGN_UP} component={SignUp} />
							<Route path={ROUTES.PROFILE} component={Profile} />

							<Route
								component={SuggestionPage}
								path={ROUTES.SUGGESTIONS}
							/>
							<ProtectedRoute
								user={user}
								path={ROUTES.DASHBOARD}
								exact
							>
								<Dashboard />
							</ProtectedRoute>
							<Route component={NotFound} />
						</Switch>
					</Suspense>
				</Router>
				<ModalPost />
			</div>
		</UserContext.Provider>
	);
}

export default App;
