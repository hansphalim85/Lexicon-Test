import React from 'react';

class FailLoad extends React.Component {
    render() {
        return (
            <div>
                <div>The data is failed to load</div>
                <button onClick={this.props.resetState}>Try Again!</button>
            </div>
        );
    }
}

export default FailLoad;
