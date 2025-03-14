import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/main';
import Navbar from './components/navbar';
import Menu from './components/menu';
import District from './components/district';
import Search from './components/list';
import Pincode from './components/pin';
import Updates from './components/notify';
import VaccineWB from './components/vaccine/district';
import VaccineHome from './components/vaccine/home';
import StateDetails from './components/district'; // Import the StateDetails component

import './App.css';

function App(props) {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/district/:district" component={District} />
                    <Route path="/pincode/:pin" component={Pincode} />
                    <Route path="/list" component={Search} />
                    <Route path="/notification" component={Updates} />
                    <Route path="/vaccine/wb/:id" component={VaccineWB} />
                    <Route path="/vaccine" component={VaccineHome} />

                    {/* Add a route for displaying state details */}
                    <Route path="/state/:stateName" component={StateDetails} />
                </Switch>

                <Menu />
            </Router>
        </div>
    );
}

export default App;
