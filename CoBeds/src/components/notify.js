import React, { Component } from "react";
import { Helmet } from 'react-helmet';

class Updates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            error: null,
        };
    }

    componentDidMount() {
        const apiUrl = "http://localhost:5000/api/data.json"; // Use the proxy server route to make the external API request

        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Network response was not ok (${res.status})`);
                }

                // Extract the Content-Type header directly
                const contentType = res.headers.get("Content-Type");
                console.log("Content-Type:", contentType);

                return res.json();
            })
            .then((json) => {
                const data = this.processData(json); // Process the fetched data
                this.setState({
                    isLoaded: true,
                    data: data,
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                this.setState({
                    error: error.message,
                });
            });
    }

    // Process the fetched data to get the desired format
    processData(jsonData) {
        if (!jsonData || typeof jsonData !== "object") {
            // Handle cases where jsonData is not an object or is null/undefined
            return [];
        }

        const processedData = [];

        for (const stateCode in jsonData) {
            if (Object.hasOwnProperty.call(jsonData, stateCode)) {
                const stateData = jsonData[stateCode];
                if (stateData && stateData.dates) {
                    const latestData = stateData.dates[Object.keys(stateData.dates).pop()];

                    if (latestData && latestData.confirmed !== 0) {
                        processedData.push({
                            state: stateData.state,
                            deltaconfirmed: latestData.delta.confirmed,
                            deltarecovered: latestData.delta.recovered,
                            deltadeaths: latestData.delta.deceased,
                            lastupdatedtime: latestData.meta.last_updated,
                        });
                    }
                }
            }
        }

        return processedData;
    }

    render() {
        const { data, isLoaded, error } = this.state;

        if (error) {
            return (
                <div className="home container">
                    <p>Error fetching data: {error}</p>
                </div>
            );
        } else if (isLoaded) {
            return (
                <div className="home container fadeInUp">
                    <Helmet>
                        <title>CoBeds West Bengal - Bed Availability Tracker</title>
                    </Helmet>
                    <table>
                        <thead>
                        <tr>
                            <th>State</th>
                            <th>Confirmed</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                            <th>Last Updated</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.state}</td>
                                <td>{item.deltaconfirmed}</td>
                                <td>{item.deltarecovered}</td>
                                <td>{item.deltadeaths}</td>
                                <td>{item.lastupdatedtime}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Updates;
