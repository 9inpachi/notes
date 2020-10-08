import React, { useState } from 'react';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var colors = ['#fcba03', '#eb4034', '#43388c', '#70db8b'];

// function ColorBox() {
//     var [color, setColor] = useState('blue');
//     function changeColor() {
//         var colorIndex = getRandomInt(0, 3);
//         setColor(colors[colorIndex]);
//     }
//     return (
//         <div
//             style={{ width: "200px", height: "200px", display: "block", background: color }}
//             onClick={changeColor}></div>
//     );
// }

// Class component
class ColorBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { color: 'red' };
    }
    changeColor = () => {
        var colorIndex = getRandomInt(0, 3);
        this.setState({ color: colors[colorIndex] });
    }
    render() {
        return <button type='button' style={{ background: this.state.color }} onClick={this.changeColor}>Click to Change Color</button>;
    }
}

export default ColorBox;