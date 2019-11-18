import React from 'react';

class Planet extends React.Component {
    handleChange = (event) => {
        this.props.setMissionPlanet(
            this.props.order,
            event.currentTarget.value
        );
    };
    render() {
        const planets = this.props.planets;
        return (
            <select onChange={this.handleChange}>
                <option value="">Select</option>
                {Object.keys(planets).map((key) => (
                    <option
                        key={key}
                        value={planets[key].name}
                        disabled={!planets[key].available}>
                        {planets[key].name}
                    </option>
                ))}
            </select>
        );
    }
}

export default Planet;
