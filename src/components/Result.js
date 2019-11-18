import React from 'react';
import TotalTime from './TotalTime';

class Result extends React.Component {
    render() {
        if (this.props.success === true) {
            return (
                <div>
                    <div>
                        Success! Congratulations on Finding Falcone. King Shan
                        is mighty pleased.
                        <br />
                        <br />
                        <TotalTime time={this.props.time} />
                        <br />
                        Planet found: {this.props.planet}
                        <br />
                        <br />
                        <button onClick={this.props.resetState}>
                            Start Again
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        Failed! Sorry please try again!
                        <br />
                        <br />
                        <button onClick={this.props.resetState}>
                            Start Again
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default Result;
