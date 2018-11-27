import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import MyLayout from 'components/layout'

import './index.scss';
import Routes from './router';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <MyLayout>
                    <Routes />
                </MyLayout>
            </BrowserRouter>
        )
    }
}

export default App;