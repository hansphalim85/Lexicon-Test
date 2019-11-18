import React from 'react';
import Planet from './Planet';
import Vehicle from './Vehicle';

class Finder extends React.Component {
    render() {
        return (
            <div className="finder_wrapper">
                <div>Destination {this.props.order}</div>
                <Planet
                    planets={this.props.planets}
                    setMissionPlanet={this.props.setMissionPlanet}
                    order={this.props.order}
                />
                <Vehicle
                    vehicles={this.props.vehicles}
                    order={this.props.order}
                    distance={this.props.distance}
                    mission={this.props.mission}
                    setMissionVehicle={this.props.setMissionVehicle}
                />
            </div>
        );
    }
}

export default Finder;
