import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Alert from '@material-ui/lab/Alert';
import timeago from 'epoch-timeago';

export default function Pin(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalResources, setTotalResources] = useState(0);
    const [remainingResources, setRemainingResources] = useState(0);

    // Props
    let pincode = props.match.params.pin;
    let formattedPincode = formatPincode(pincode);

    // Format Pincode
    function formatPincode(pincode) {
        // You can add formatting logic here if needed
        return pincode;
    }

    useEffect(() => {
        fetch('http://localhost:5000/api/beds') // Update the API URL accordingly
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Network response was not ok (${res.status})`);
                }

                return res.json();
            })
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data); // Update this based on the structure of your data
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    useEffect(() => {
        if (items && items.length > 0) {
            const pincodeData = items.find((item) => item.pincode === formattedPincode);
            if (pincodeData) {
                setTotalResources(pincodeData.totalResources);
                setRemainingResources(pincodeData.remainingResources);
            }
        }
    }, [formattedPincode, items]);

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
    } else {
        return (
            <div className="home">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="district_name">
                                <i className="em em-mask"></i> {formattedPincode}
                            </h1>
                        </Col>
                        <Col>
                            <div className="name_indi">
                                <h6>
                                    <span className="badge bg-warning">{remainingResources} </span> Remaining Resources
                                </h6>
                                <h6>
                                    <span className="badge bg-success">{totalResources} </span> Total Allotted Resources
                                </h6>
                            </div>
                        </Col>
                    </Row>
                    <Alert className="mt-2 mb-2" severity="info">
                        Data may be delayed or partial. Please verify with the hospital.
                    </Alert>
                </Container>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>COVID Hospital Details</th>
                        <th>Total COVID Beds</th>
                        <th>Total Oxygen Beds</th>
                        <th>Total ICU Beds</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items
                        .filter((item) => item.pincode === formattedPincode)
                        .map((item, index) => {
                            const timeSince = timeago(item.lastUpdatedOn - 60000 * 10);
                            const update = timeSince.split('51 years ago').join('unknown');
                            return (
                                <tr key={index}>
                                    <td>
                                        <strong>{item.hospitalName}</strong>
                                        <br />
                                        <p>
                                            <span className="badge bg-secondary"> {update} </span>
                                        </p>
                                    </td>
                                    <td>
                                        <h1>
                                                <span className="badge bg-warning">
                                                    {item.availableBedsAllocatedToCovid}
                                                </span>
                                        </h1>
                                        <h1>
                                                <span className="badge bg-success">
                                                    {item.totalBedsAllocatedToCovid}
                                                </span>
                                        </h1>
                                    </td>
                                    <td>
                                        <h1>
                                                <span className="badge bg-warning">
                                                    {item.availableBedsWithOxygen}
                                                </span>
                                        </h1>
                                        <h1>
                                                <span className="badge bg-success">
                                                    {item.totalBedsWithOxygen}
                                                </span>
                                        </h1>
                                    </td>
                                    <td>
                                        <h1>
                                                <span className="badge bg-warning">
                                                    {item.availableIcuBedsWithoutVentilator}
                                                </span>
                                        </h1>
                                        <h1>
                                                <span className="badge bg-success">
                                                    {item.totalIcuBedsWithoutVentilator}
                                                </span>
                                        </h1>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
