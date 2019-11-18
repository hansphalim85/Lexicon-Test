import React from 'react';

class StartAgain extends React.Component {
    render() {
        return (
            <button onClick={this.props.resetState}>
                {this.props.buttonText}
            </button>
        );
    }
}

export default StartAgain;