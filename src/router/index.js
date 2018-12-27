import React from 'react'
import {
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import jsCookie from 'js-cookie'
import NotFound from '../not_found_page'
import Dashboard from '../dashboard'
import staff from './routes/staff';
import news from './routes/news';
import recruit from './routes/recruit';
import stuff from './routes/stuff';
import website from './routes/website';
import article from './routes/article';
import MyLayout from 'components/layout'
import Login from '../login';



const routes = [
	{
		path: '/dashboard',
		component: Dashboard,
	},
	...staff,
	...news,
	...recruit,
	...stuff,
	...website,
	...article,
]

function PrivateRoute({ component: Component,isAuthenticated, ...rest }) {
	console.log(Component, isAuthenticated,rest);
	return (
	  <Route
		{...rest}
		render={props =>
			isAuthenticated ? (
			<MyLayout><Component {...props} /></MyLayout>
		  ) : (
			<Redirect
			  to={{
				pathname: "/login",
				state: { from: props.location }
			  }}
			/>
		  )
		}
	  />
	);
}
class Routes extends React.Component {
	state = {
		isAuthenticated: jsCookie.get('userName'),
	}
	loginIn = (val) => {
		this.setState({
			isAuthenticated: val,
		})
	}
	componentDidMount() {
		console.log(this.state.isAuthenticated);
	}
	render() {
		const { isAuthenticated } = this.state;
		const defaultPath = isAuthenticated ? "/dashboard" : "/login";
		console.log(defaultPath);
		return (
		<Switch>
			<Route path='/' render={() => <Redirect to = {defaultPath} />} exact />
			{routes.map(item => <PrivateRoute key={item.path} {...item} isAuthenticated={isAuthenticated} />)}
			<Route path='/login' render={() => <Login loginIn={this.loginIn} />}/>
			<Route path='*' component={NotFound} />
		</Switch>
	)}
}
export default Routes

