import React from 'react';
import { reachable, isAvailable } from '../helpers';

class Vehicle extends React.Component {
    handleClick = (event) => {
        this.props.setMissionVehicle(
            this.props.order,
            event.currentTarget.value
        );
    };
    vehicleUseable = (vehicles) => {
        if (
            reachable(this.props.distance, vehicles.max_distance) &&
            isAvailable(vehicles.total_no - vehicles.taken)
        ) {
            return true;
        } else {
            return false;
        }
    };

    render() {
        const vehicles = this.props.vehicles;
        return (
            <ul
                hidden={
                    typeof this.props.mission === 'undefined' ||
                    this.props.mission === ''
                }
                className="vehicles">
                {Object.keys(vehicles).map((key) => (
                    <li key={key} className="vehicle">
                        <label>
                            <input
                                disabled={!this.vehicleUseable(vehicles[key])}
                                onClick={this.handleClick}
                                type="radio"
                                name={this.props.order}
                                value={vehicles[key].name}
                            />
                            {vehicles[key].name} (
                            {vehicles[key].total_no - vehicles[key].taken})
                        </label>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Vehicle;
