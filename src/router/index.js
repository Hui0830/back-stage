import React from 'react'
import {
	Route,
	Switch,
	Redirect,
	withRouter
} from 'react-router-dom'




import {getIsAuth} from 'common/utils/auth';
import NotFound from '../pages/not_found_page';
import PrivateRoutes from './routes.js'

import MyLayout from 'components/layout'
import Login from '../pages/login';






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
			<Route path='/' exact render={() => <Redirect to="/dashboard" />} />
				{
					isAuthenticated &&
					<MyLayout loginOut={this.loginOut} >
						<PrivateRoutes isAuthenticated={isAuthenticated} />
					</MyLayout>
				}
			<Route path='*' render={() => isAuthenticated ? <NotFound /> : <Redirect to="/login" />} />
		</Switch>
	)}
}
export default withRouter(Routes)

