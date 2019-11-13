import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Button from './components/button';
import Box from './components/Box';
import ColorBox from './components/ColorBox';
import LifeCycle from './components/LifeCycle';
import HooksComponent from './components/HooksComponent';
import RouterApp from './components/ReactRouter';

// A simple test component that can be created anywhere
class TestComponent extends React.Component {
    render () {
        return <div className="header">
            <img className="logo" src="" />
        </div>;
    }
}

// Inline styles work as JSON
// The {} are used to define variables so that styles JSON is essentially working as a variable
var variableAsComponent = ( // Kuuru desu yo *_*
    <div className="header">
        <div style={{display: "block", width: "100px", height: "100px", background: "red"}}></div>
        <Button title="My Link" href="http://google.com" />
    </div>
);

var boxes = [
    {image: "https://cdn.shopify.com/s/files/1/0023/1433/8419/products/purple-mountains_512x410.jpg", title: "Box 1", desc: "Box 1 description here"},
    {image: "https://s3.amazonaws.com/captainkimo/wp-content/uploads/2016/09/22211618/Pine-Glades-Wetlands-Natural-Area-Sunset-Square.jpg", title: "Box 2", desc: "Box 2 description here"},
    {image: "https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/8/10/8103bef5-a83b-5926-8261-dc6d3eafb6da/5cb0c9bb83298.image.jpg", title: "Box 3", desc: "Box 3 description here"},
];

function Body ({data}) {
    return (
        <div>
            {data.boxesData.map(function (boxData, i) {
                return <Box key={i} image={boxData.image} title={boxData.title} desc={boxData.desc} />;
            })}
            <div style={{clear: 'both'}}></div>
            <ColorBox />
        </div>
    );
}

// ReactDOM.render(<LifeCycle allowChange={true} />, document.getElementById('root'));
ReactDOM.render(<RouterApp />, document.getElementById('root'));
