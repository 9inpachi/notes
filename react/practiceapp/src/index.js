import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA

class TestComponent extends React.Component {
    render () {
        return <div className="header">
            <img className="logo" src="https://66.media.tumblr.com/6bcfb29e7381d0eb10ee044e73606e29/tumblr_o754xwE42Q1u8pxy6o1_1280.png" />
        </div>;
    }
}

ReactDOM.render(<TestComponent />, document.getElementById('root'));

serviceWorker.unregister();
