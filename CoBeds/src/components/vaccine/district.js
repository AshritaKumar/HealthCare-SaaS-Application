import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from 'react-bootstrap/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10px',
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '10px',
    },
}));

export default function VaccineDistrict() {
    const [selectedDate, setSelectedDate] = useState('');
    const [sessionsData, setSessionsData] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        // Fetch data based on the selected date
        if (selectedDate) {
            axios
                .get(`http://localhost:5000/api/data_vaccine?date=${selectedDate}`)  // Corrected URL
                .then((response) => {
                    const data = response.data;

                    if (data && data.sessions) {
                        setSessionsData(data.sessions);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    // You can set an error state here if needed
                });
        }
    }, [selectedDate]);

    return (
        <div className="home">
            <Container>
                <h2>Available Dates by District</h2>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="date">Choose Date:</label>
                            <input
                                type="date"
                                id="date"
                                onChange={(event) => setSelectedDate(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </div>
                <Box color="text.primary" clone>
                    <div className={classes.root}>
                        <Grid borderColor="primary.main" container spacing={3}>
                            <Grid item xs={6} sm={3}>
                                <span className="badge bg-warning text-dark">{' '}</span>
                                <strong> Vaccination Date</strong>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <p>
                                    <span className="badge bg-danger">{' '}</span> <strong> Minimum Age </strong>
                                </p>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <p>
                                    <span className="badge bg-success">{' '}</span> <strong>Available Vaccination</strong>
                                </p>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <span className="badge bg-info text-light">{' '}</span> <strong> Vaccination Time Slots</strong>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        {sessionsData.map((session, index) => (
                            <Grid key={index} item xs={12}>
                                <Paper className={classes.paper}>
                                    <h2 className="hos">{session.name}</h2>
                                    <p><i className="em em-round_pushpin"></i> {session.address}</p>
                                    <h5>
                                        <i className="em em-mask"> </i> <span className="badge bg-danger">{session.min_age_limit}</span>
                                    </h5>
                                    <h3>
                                        <span className="badge bg-light text-dark">{session.vaccine}</span>
                                    </h3>
                                    <h4>
                                        <i className="em em-syringe"></i> <span className="badge bg-success">{session.available_capacity}</span>
                                    </h4>
                                    <p className="slots bg-info text-light">{session.slots.join(', ')}</p>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Container>
        </div>
    );
}
