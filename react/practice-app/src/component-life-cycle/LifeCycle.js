import React from 'react';

class LifeCycle extends React.Component {
    constructor(props) {
        super(props);
        // Set the initial state
        this.state = { changed: 'will change' };
    }
    // Called just before render()
    static getDerivedStateFromProps(props, state) {
        return state;
    }
    // Called right after render()
    componentDidMount() {
        setTimeout(() => {
            this.setState({ changed: 'has changed' });
        }, 3000);
    }
    render() {
        return <div>Some text that {this.state.changed}</div>;
    }
    // When a component is updated -> getDerivedStateFromProps(), shouldComponentUpdate(), render(), getSnapshotBeforeUpdate(), componentDidUpdate() are called in order
    shouldComponentUpdate() {
        return this.props.allowChange !== undefined ? this.props.allowChange : true;
    }
    // Used to get the previous props and states after the update has taken place
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(prevProps, prevState);
        return prevState;
    }
    // Called after component is updated
    componentDidUpdate() {
        console.log('Component is updated', this.state);
    }
}

export default LifeCycle;