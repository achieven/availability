import React from 'react';

class AvailabilityCircle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number : 0
        };
        this.number = this.counter.bind(this);
    }

    counter () {
        this.setState({number: this.state.number});
    }

    render() {
        return (
            <div>
                Number : <span>{this.state.number}</span>
                <div><button onClick={this.counter}>plus</button></div>
            </div>
        );
    }

}

export default AvailabilityCircle;