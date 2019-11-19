import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Result from './Result';
import Airbase from './Airbase';
import FailLoad from './FailLoad';
import { notEmpty, getTimeTaken, callFetch } from '../helpers';

class App extends React.Component {
    state = {
        planets: [],
        vehicles: [],
        missions: {
            planets: [],
            distance: [],
            vehicles: []
        },
        time: 0,
        readyToGo: false,
        success: false,
        findAPI: false,
        resultPlanet: '',
        loaded: true,
        finders: process.env.REACT_APP_FINDERS,
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

    async findingFalcon(request) {
        const FindResponse = await callFetch(process.env.REACT_APP_FIND_URL, 'POST', request);

        if (FindResponse !== false) {
            if (FindResponse.status === 'false') {
                this.setState({ 
                    success: false,
                    findAPI: true,
                    resultMessage:'Failed! Sorry please try again!'
                });
            } else {
                this.setState({ 
                    success: true,
                    findAPI: true,
                    resultPlanet: FindResponse.planet_name,
                    resultMessage:'Success! Congratulations on Finding Falcone. King Shan is mighty pleased.'
                });
            }
        } else {
            alert('Please try again');
        }
    }

    async prepareFindingFalcon() {
        const missions = { ...this.state.missions };
        const missionPlanets = missions.planets;
        const missionVehicles = missions.vehicles;
        let request = {};

        const tokenResponse = await callFetch(process.env.REACT_APP_TOKEN_URL, 'POST');

        if (tokenResponse !== false) {
            request['token'] = tokenResponse.token;

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
        } else {
            alert('Please try again1');
        }
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

        if (findersReady === parseInt(this.state.finders)) {
            this.setState({ readyToGo: true });
        } else {
            this.setState({ readyToGo: false });
        }
    }

    async loadVehicles() {
        const vehiclesResponse = await callFetch(process.env.REACT_APP_VEHICLE_URL, 'GET');

        if (vehiclesResponse !== false) {
            Object.keys(vehiclesResponse).map((key) => {
                let vehicles = { ...this.state.vehicles };
                vehicles[key] = vehiclesResponse[key];
                vehicles[key].taken = 0;
                this.setState({ vehicles });
                return true;
            });
        } else {
            this.setState({ loaded: false });
        }
    }

    async loadPlanets() {
        const planetResponse = await callFetch(process.env.REACT_APP_PLANET_URL, 'GET');

        if (planetResponse !== false) {
            Object.keys(planetResponse).map((key) => {
                let planets = { ...this.state.planets };
                planets[key] = planetResponse[key];
                planets[key].available = true;
                this.setState({ planets });
                return true;
            });
        } else {
            this.setState({ loaded: false });
        }
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
