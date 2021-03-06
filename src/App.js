import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import ls from 'local-storage'

import TestsContext from './context/TestsContext'

import LandingPage from './landingPage/LandingPage';
import MainPage from './components/MainPage';

import './App.css'

class App extends Component {
    state = {
        userId: ls.get('userId'),
        token: ls.get('token'),
        proxy: window.location.href.startsWith('http://') ? 'http://localhost:5000' : 'https://testing-app-easytest.herokuapp.com'
    }

    setToken = (token, userId) => {
        this.setState({
            token: token,
            userId: userId
        })
        ls.set('token', token);
        ls.set('userId', userId);
    }

    logout = () => {
        this.setState({
            token: '',
            userId: ''
        });
        ls.set('token', '');
        ls.set('userId', '');
    }

    render() {
        const { token, userId, proxy } = this.state;
        console.log(process.env);
        console.log(window.location.href);
        
        

        return (
            <BrowserRouter basename={ process.env.PUBLIC_URL }>
                <React.Fragment>
                    <TestsContext.Provider value={{ token, userId, setToken: this.setToken, logout: this.logout, proxy  }}>
                        <Switch>
                            <Route exact path="/" component={ LandingPage } />
                            <Route path="/app" component={ MainPage } />
                        </Switch>
                    </TestsContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default App