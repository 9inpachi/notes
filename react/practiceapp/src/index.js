import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// A simple test component that can created anywhere
class TestComponent extends React.Component {
    render () {
        return <div className="header">
            <img className="logo" src="https://66.media.tumblr.com/6bcfb29e7381d0eb10ee044e73606e29/tumblr_o754xwE42Q1u8pxy6o1_1280.png" />
        </div>;
    }
}

// Inline styles work as JSON
// The {} are used to define variables so that styles JSON is essentially working as a variable
var variableAsComponent = ( // Kuuru desu yo *_*
    <div className="header">
        <div style={{display: "block", width: "100px", height: "100px", background: "red"}}></div>
    </div>
);

ReactDOM.render(variableAsComponent, document.getElementById('root'));

serviceWorker.unregister();
