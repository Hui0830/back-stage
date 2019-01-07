import React from 'react'
import {
	Route,
	Switch,
	Redirect,
	withRouter
} from 'react-router-dom'


import {getIsAuth} from 'common/utils/auth';
import NotFound from '../not_found_page';
import Dashboard from '../dashboard';
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

function PrivateRoute({ component: Component,isAuthenticated,userInfo,loginOut, ...rest }) {
	// console.log(Component, isAuthenticated,rest);
	return (
	  <Route
		{...rest}
		render={props =>
			isAuthenticated ? (<Component {...props} />
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
// React.PureComponent
class Routes extends React.PureComponent {
	state = {
		isAuthenticated: getIsAuth(),
	}
	// 获取用户信息
	login = () => {
			this.setState({
				isAuthenticated: true,
			})
	}
	// 退出登入，清除用户信息
	loginOut = () => {
		localStorage.clear();
		this.setState({
			isAuthenticated: false
		})
	}
	render() {
		const { isAuthenticated } = this.state;
		return (
		<Switch>
			<Route path='/login' render={() => <Login loginIn={this.login} />}/>
				{
					isAuthenticated &&
					<MyLayout loginOut={this.loginOut} >
					{
						routes.map(item => (
							<PrivateRoute
								key={item.path}
								{...item}
								isAuthenticated={isAuthenticated}
								/>
						))
					}
					</MyLayout>
				}
			<Route path='*' component={NotFound} />
		</Switch>
	)}
}
export default withRouter(Routes)

