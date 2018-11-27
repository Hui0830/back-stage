import React from 'react'
import {
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import NotFound from '../not_found_page'
import staff from './routes/staff';
// import Home from '../../pages/Home'
// import About from '../../pages/AboutAs/about'
// import Information from '../../pages/Information/information'
// import JoinPage from '../../pages/Joinpage/joinAs'
// import News from '../../pages/News/news'
// import Products from '../../pages/Products/product'
// import Service from '../../pages/Service/service'
// import NotFound from '../../pages/404Page/notfound'

const routes = [
	{
		path: '/',
		render: () => <Redirect to = "/dashboard" />,
		exact: true,
	},
    ...staff,
]

// 传入404配置页面
routes.push({
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

