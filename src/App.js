import React, {Component} from 'react';
import './App.css';
import Container from './components/Container'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';

class App extends Component {
    render() {
        return (
            <div>
                <Container/>
            </div>
        );
    }
}

export default App;
