import React from 'react';
import {BrowserRouter,HashRouter,Redirect} from 'react-router-dom';



import './index.scss';
import Routes from './router';

class App extends React.Component {
    state = {
    }
    render() {
        return (
            <HashRouter>
                <Routes />
            </HashRouter>
        )
    }
}

export default App;