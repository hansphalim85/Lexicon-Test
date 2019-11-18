import React from 'react';
import TotalTime from './TotalTime';
import StartAgain from './StartAgain';

class Result extends React.Component {
    render() {
        return (
            <div>
                {this.props.resultMessage}
                <br />
                <br />
                <div hidden={!this.props.success}>
                    <TotalTime time={this.props.time}/>
                    <br />
                    Planet found: {this.props.planet}
                </div>
                <br />
                <br />
                <StartAgain
                    resetState={this.props.resetState}
                    buttonText="Start Again"
                />
            </div>
        );
    }
}

export default Result;
