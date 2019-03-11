import React,{ PureComponent } from 'react'
import {
	Route,
    Redirect,
    withRouter
} from 'react-router-dom'

import Loadable from 'react-loadable';
import  Loading from './loadable_loading'

import Dashboard from '../pages/dashboard';
import staff from './routes/staff';
import news from './routes/news';
import recruit from './routes/recruit';
import stuff from './routes/stuff';
import website from './routes/website';
import article from './routes/article';
import product from './routes/product';

const routes = [
	{
		path: '/dashboard',
        loader: Dashboard,
        async: true
	},
	...staff,
	...news,
	...recruit,
	...stuff,
	...website,
	...article,
	...product
]

function PrivateRoute({ loader,isAuthenticated, async,...rest }) {
    if(isAuthenticated) {
        if(async) {
            return <Route component={loader} {...rest} />
        } else {
            return <Route
                {...rest}
                component={Loadable({
                    loader: loader,
                    loading: Loading
                })}
            />
        }
    }
    return (
        <Route
            {...rest}
            render={() => <Redirect
                to={{
                    pathname: "/login",
                }}
            />}
        />
    );
}

class Routes extends PureComponent {
    render() {
        const { isAuthenticated} = this.props
        return (
            
            routes.map(item => (
                <PrivateRoute
                    key={item.path}
                    {...item}
                    isAuthenticated={isAuthenticated}
                    />
            ))
            
        )
    }
}
export default withRouter(Routes)