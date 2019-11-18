import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Result from './Result';
import Airbase from './Airbase';
import FailLoad from './FailLoad';
import { notEmpty, getTimeTaken } from '../helpers';

class App extends React.Component {
    state = {
        planets: [],
        vehicles: [],
        missions: {
            planets: [],
            distance: [],
            vehicles: []
        },
        time: 100,
        readyToGo: false,
        success: false,
        findAPI: false,
        resultPlanet: '',
        loaded: true,
        finders: 4,
        resultMessage:''
    };

    componentDidMount() {
        this.loadPlanets();
        this.loadVehicles();
        this.setState({ time: 0 });
    }

    resetState() {
        window.location.reload();
    }

    findingFalcon(request) {
        fetch('https://findfalcone.herokuapp.com/find', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'false') {
                    this.setState({ 
                        success: false,
                        findAPI: true,
                        resultMessage:'Failed! Sorry please try again!'
                    });
                } else {
                    this.setState({ 
                        success: true,
                        findAPI: true,
                        resultPlanet: responseJson.planet_name,
                        resultMessage:'Success! Congratulations on Finding Falcone. King Shan is mighty pleased.'
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Please try again');
            });
    }

    prepareFindingFalcon() {
        const missions = { ...this.state.missions };
        const missionPlanets = missions.planets;
        const missionVehicles = missions.vehicles;
        let request = {};

        fetch('https://findfalcone.herokuapp.com/token', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                request['token'] = responseJson.token;

                let planets = [];
                Object.keys(missionPlanets).map((p) => {
                    planets.push(missionPlanets[p]);
                    return true;
                });
                request['planet_names'] = planets;

                let vehicles = [];
                Object.keys(missionVehicles).map((v) => {
                    vehicles.push(missionVehicles[v]);
                    return true;
                });
                request['vehicle_names'] = vehicles;

                this.findingFalcon(request);
            })
            .catch((error) => {
                console.error(error);
                alert('Please try again1');
            });
    }

    setMissionPlanet(key, planetKey) {
        const missions = { ...this.state.missions };
        missions.planets[key] = planetKey;
        this.setState({ missions });

        this.refreshPlanetList();
    }

    setMissionVehicle(key, vehicleKey) {
        const missions = { ...this.state.missions };
        missions.vehicles[key] = vehicleKey;
        this.setState({ missions });

        this.refreshPlanetList();
    }

    refreshPlanetList() {
        const missions = { ...this.state.missions };
        const missionPlanets = missions.planets;
        const missionVehicles = missions.vehicles;
        const planets = { ...this.state.planets };
        const vehicles = { ...this.state.vehicles };
        let timeTaken = 0;
        let findersReady = 0;

        Object.keys(planets).map((p) => {
            planets[p].available = true;
            return true;
        });

        Object.keys(vehicles).map((p) => {
            vehicles[p].taken = 0;
            return true;
        });

        Object.keys(missionPlanets).map((i) => {
            let distance = 0;
            if (notEmpty(missionPlanets[i])) {
                Object.keys(planets).map((p) => {
                    if (missionPlanets[i] === planets[p].name) {
                        planets[p].available = false;
                        distance = planets[p].distance;
                        missions.distance[i] = planets[p].distance;
                    }
                    return true;
                });

                if (notEmpty(missionVehicles[i])) {
                    Object.keys(vehicles).map((p) => {
                        if (missionVehicles[i] === vehicles[p].name) {
                            vehicles[p].taken += 1;
                            timeTaken += getTimeTaken(
                                distance,
                                vehicles[p].speed
                            );
                        }
                        return true;
                    });
                    findersReady += 1;
                }
            }

            return true;
        });

        this.setState({ planets: planets });
        this.setState({ time: timeTaken });

        if (findersReady === this.state.finders) {
            this.setState({ readyToGo: true });
        } else {
            this.setState({ readyToGo: false });
        }
    }

    loadVehicles() {
        fetch('https://findfalcone.herokuapp.com/vehicles', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Object.keys(responseJson).map((key) => {
                    let vehicles = { ...this.state.vehicles };
                    vehicles[key] = responseJson[key];
                    vehicles[key].taken = 0;
                    this.setState({ vehicles });
                    return true;
                });
            })
            .catch((error) => {
                this.setState({ loaded: false });
            });
    }

    loadPlanets() {
        fetch('https://findfalcone.herokuapp.com/planets', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Object.keys(responseJson).map((key) => {
                    let planets = { ...this.state.planets };
                    planets[key] = responseJson[key];
                    planets[key].available = true;
                    this.setState({ planets });
                    return true;
                });
            })
            .catch((error) => {
                this.setState({ loaded: false });
            });
    }
    render() {
        if (this.state.findAPI) {
            return (
                <div>
                    <Header />
                    <Result
                        time={this.state.time}
                        planet={this.state.resultPlanet}
                        resetState={this.resetState}
                        success={this.state.success}
                        resultMessage={this.state.resultMessage}
                    />
                    <Footer />
                </div>
            );
        } else if (!this.state.loaded) {
            return (
                <div>
                    <Header />
                    <FailLoad resetState={this.resetState} />
                    <Footer />
                </div>
            );
        } else {
            return (
                <div>
                    <Header />
                    <Airbase
                        finders={this.state.finders}
                        time={this.state.time}
                        planets={this.state.planets}
                        vehicles={this.state.vehicles}
                        missions={this.state.missions}
                        setMissionPlanet={this.setMissionPlanet.bind(this)}
                        setMissionVehicle={this.setMissionVehicle.bind(this)}
                        readyToGo={this.state.readyToGo}
                        prepareFindingFalcon={this.prepareFindingFalcon.bind(
                            this
                        )}
                    />
                    <Footer />
                </div>
            );
        }
    }
}

export default App;
