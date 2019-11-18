import React from 'react';
import TotalTime from './TotalTime';
import Finder from './Finder';

class Airbase extends React.Component {
    createFinder = () => {
        let finders = [];

        for (let i = 0; i < this.props.finders; i++) {
            finders.push(
                <div key={i} className="airbase_finders">
                    <Finder
                        order={i + 1}
                        planets={this.props.planets}
                        vehicles={this.props.vehicles}
                        mission={this.props.missions.planets[i + 1]}
                        distance={this.props.missions.distance[i + 1]}
                        setMissionPlanet={this.props.setMissionPlanet}
                        setMissionVehicle={this.props.setMissionVehicle}
                    />
                </div>
            );
        }

        return finders;
    };

    render() {
        return (
            <div id="airbase_wrapper">
                <div id="airbase_text">
                    Select planets you want to search in:
                </div>
                <div id="airbase_wrapper">
                    {this.createFinder()}
                    <div className="airbase_finders">
                        <TotalTime time={this.props.time} />
                    </div>
                    <div className="clear"></div>
                </div>
                <button
                    onClick={this.props.prepareFindingFalcon}
                    disabled={!this.props.readyToGo}>
                    Find Falcone!
                </button>
            </div>
        );
    }
}

export default Airbase;
