import React from 'react'
import {
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import NotFound from '../not_found_page'
import Dashboard from '../dashboard'
import staff from './routes/staff';
import news from './routes/news';
import recruit from './routes/recruit';
import stuff from './routes/stuff';
import website from './routes/website';
import article from './routes/article';

const routes = [
	{
		path: '/',
		render: () => <Redirect to = "/dashboard" />,
		exact: true,
	},
	...staff,
	...news,
	...recruit,
	...stuff,
	...website,
	...article,
]

// 传入404配置页面
routes.push({
	path: '/dashboard',
	component: Dashboard,
},{
    path: '*',
    component: NotFound
})


console.log(routes);
const Routes = () => (
	<Switch>
		{routes.map((item, index) => <Route key={item.path} { ...item } />)}
	</Switch>
)

export default Routes

