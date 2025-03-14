// StateDetails.js

import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Alert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';

export default function StateDetails() {
    const { stateName } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [contentType, setContentType] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/beds')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Network response was not ok (${res.status})`);
                }

                const contentType = res.headers.get('Content-Type');
                setContentType(contentType);

                return res.json();
            })
            .then(
                (result) => {
                    setIsLoaded(true);
                    const selectedStateData = result.data.regional.find((item) => item.state === stateName);

                    if (selectedStateData) {
                        setItems(selectedStateData);
                    } else {
                        setError(new Error(`State '${stateName}' not found in the data.`));
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [stateName]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className="home">
                <div className="spinner-grow text-info" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    } else if (!items) {
        return <div>State data not found.</div>;
    } else {
        return (
            <div className="home">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="state_name">
                                <i className="em em-mask"></i> {stateName}
                            </h1>
                        </Col>
                        <Col>
                            <div className="name_indi">
                                <h6>
                                    <span className="badge bg-warning">{items.ruralBeds} </span> Remaining Resources for rural
                                </h6>
                                <h6>
                                    <span className="badge bg-success">{items.totalBeds} </span> Total Allotted Resources
                                </h6>
                            </div>
                        </Col>
                    </Row>
                    <Alert className="mt-2 mb-2" severity="info">
                        Data may be delayed or partial. Please verify with the hospital.
                    </Alert>
                    <div className="mt-2">
                        <strong>Content Type:</strong>
                        <div>{contentType}</div>
                    </div>
                </Container>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Total hospitals</td>
                        <td><strong>{items.totalHospitals}</strong></td>
                    </tr>

                    <tr>
                        <td>Total Rural Beds</td>
                        <td>{items.ruralBeds}</td>
                    </tr>
                    <tr>
                        <td>Total Rural Hospital</td>
                        <td>{items.ruralHospitals}</td>
                    </tr>
                    <tr>
                        <td>Total urban Beds</td>
                        <td>{items.urbanBeds}</td>
                    </tr>
                    <tr>
                        <td>Total urban hospitals </td>
                        <td>{items.urbanHospitals}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}
