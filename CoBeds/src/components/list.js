// FAQ.js

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        background: '#2B2D42',
    },
}));

function FAQ(props) {
    const [states, setStates] = useState([]);
    const classes = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getStates();
    }, []);

    const getStates = () => {
        axios
            .get('http://localhost:5000/api/beds')
            .then((response) => {
                setIsLoaded(true);
                if (response.data && response.data.data && response.data.data.regional) {
                    setStates(response.data.data.regional.map((item) => ({ state: item.state })));
                } else {
                    console.error('API response is missing "regional" data:', response.data);
                    setStates([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (!isLoaded) {
        return (
            <div className="home">
                <Helmet>
                    <title>CoBeds West Bengal - Bed Availability Tracker </title>
                </Helmet>
                <div className="spinner-grow text-info" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="home">
                <Helmet>
                    <title>CoBeds West Bengal - Bed Availability Tracker </title>
                </Helmet>
                <Container>
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            {states.map((state, index) => {
                                return (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Paper className=" p-3 mb-2 bg-dark text-white">
                                            <div className="question">
                                                <Link to={`/state/${state.state}`}>
                                                    {state.state} <ArrowForwardOutlinedIcon />
                                                </Link>
                                            </div>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>
                </Container>
            </div>
        );
    }
}

export default FAQ;
