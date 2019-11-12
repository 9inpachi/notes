import React from 'react';

class Box extends React.Component {
    render() {
        return (
            <div className='box'>
                <img src={this.props.image} title={this.props.title ? this.props.title : 'My Title'} />
                <h3>{this.props.title ? this.props.title : 'My Title'}</h3>
                <p>{this.props.desc}</p>
            </div>
        );
    };
};

export default Box;