from flask import Flask, jsonify
import csv

app = Flask(__name__)  # Use double underscores here

# Sample data in dictionary format
sample_data = {
    "sessions": [
        {
            "center_id": 1001,
            "name": "Mumbai Health Center",
            "address": "123 ABC Road, Mumbai",
            "state_name": "Maharashtra",
            "district_name": "Mumbai City",
            "block_name": "Not Applicable",
            "pincode": 400001,
            "from": "09:00:00",
            "to": "16:00:00",
            "lat": 19.0760,
            "long": 72.8777,
            "fee_type": "Free",
            "session_id": "session-1",
            "date": "06-09-2022",
            "available_capacity": 50,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "COVAXIN",
            "slots": [
                "09:00AM-10:00AM",
                "10:00AM-11:00AM",
                "11:00AM-12:00PM"
            ]
        },
        {
            "center_id": 2001,
            "name": "Chennai Health Clinic",
            "address": "456 XYZ Street, Chennai",
            "state_name": "Tamil Nadu",
            "district_name": "Chennai",
            "block_name": "Not Applicable",
            "pincode": 600001,
            "from": "09:00:00",
            "to": "17:00:00",
            "lat": 13.0827,
            "long": 80.2707,
            "fee_type": "Free",
            "session_id": "session-2",
            "date": "06-09-2022",
            "available_capacity": 25,
            "fee": "0",
            "min_age_limit": 25,
            "vaccine": "COVISHIELD",
            "slots": [
                "09:00AM-10:00AM",
                "10:00AM-11:00AM",
                "11:00AM-12:00PM"
            ]
        },
        {
            "center_id": 3001,
            "name": "Kolkata Vaccination Center",
            "address": "789 PQR Road, Kolkata",
            "state_name": "West Bengal",
            "district_name": "Kolkata",
            "block_name": "Not Applicable",
            "pincode": 700001,
            "from": "10:00:00",
            "to": "18:00:00",
            "lat": 22.5726,
            "long": 88.3639,
            "fee_type": "Paid",
            "session_id": "session-3",
            "date": "06-09-2022",
            "available_capacity": 30,
            "fee": "250",
            "min_age_limit": 18,
            "vaccine": "SPUTNIK V",
            "slots": [
                "10:00AM-11:00AM",
                "11:00AM-12:00PM",
                "12:00PM-01:00PM"
            ]
        },
        {
            "center_id": 4001,
            "name": "Bangalore Medical Center",
            "address": "789 XYZ Road, Bangalore",
            "state_name": "Karnataka",
            "district_name": "Bangalore Urban",
            "block_name": "Not Applicable",
            "pincode": 560001,
            "from": "10:00:00",
            "to": "18:00:00",
            "lat": 12.9716,
            "long": 77.5946,
            "fee_type": "Free",
            "session_id": "session-4",
            "date": "06-09-2022",
            "available_capacity": 40,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "COVAXIN",
            "slots": [
                "10:00AM-11:00AM",
                "11:00AM-12:00PM",
                "12:00PM-01:00PM"
            ]
        },
        {
            "center_id": 5001,
            "name": "Hyderabad Health Clinic",
            "address": "456 ABC Street, Hyderabad",
            "state_name": "Telangana",
            "district_name": "Hyderabad",
            "block_name": "Not Applicable",
            "pincode": 500001,
            "from": "09:30:00",
            "to": "17:30:00",
            "lat": 17.3850,
            "long": 78.4867,
            "fee_type": "Free",
            "session_id": "session-5",
            "date": "06-09-2022",
            "available_capacity": 60,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "COVISHIELD",
            "slots": [
                "09:30AM-10:30AM",
                "10:30AM-11:30AM",
                "11:30AM-12:30PM"
            ]
        },
        {
            "center_id": 6001,
            "name": "Pune Vaccination Center",
            "address": "123 PQR Road, Pune",
            "state_name": "Maharashtra",
            "district_name": "Pune",
            "block_name": "Not Applicable",
            "pincode": 411001,
            "from": "08:00:00",
            "to": "15:00:00",
            "lat": 18.5204,
            "long": 73.8567,
            "fee_type": "Paid",
            "session_id": "session-6",
            "date": "06-09-2022",
            "available_capacity": 20,
            "fee": "150",
            "min_age_limit": 18,
            "vaccine": "SPUTNIK V",
            "slots": [
                "08:00AM-09:00AM",
                "09:00AM-10:00AM",
                "10:00AM-11:00AM"
            ]
        },
        {
            "center_id": 7001,
            "name": "Jaipur Health Center",
            "address": "456 MNO Road, Jaipur",
            "state_name": "Rajasthan",
            "district_name": "Jaipur",
            "block_name": "Not Applicable",
            "pincode": 302001,
            "from": "09:00:00",
            "to": "17:00:00",
            "lat": 26.9124,
            "long": 75.7873,
            "fee_type": "Free",
            "session_id": "session-7",
            "date": "06-09-2022",
            "available_capacity": 35,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "COVAXIN",
            "slots": [
                "09:00AM-10:00AM",
                "10:00AM-11:00AM",
                "11:00AM-12:00PM"
            ]
        },
        {
            "center_id": 8001,
            "name": "Ahmedabad Medical Center",
            "address": "789 RST Road, Ahmedabad",
            "state_name": "Gujarat",
            "district_name": "Ahmedabad",
            "block_name": "Not Applicable",
            "pincode": 380001,
            "from": "08:30:00",
            "to": "16:30:00",
            "lat": 23.0225,
            "long": 72.5714,
            "fee_type": "Free",
            "session_id": "session-8",
            "date": "06-09-2022",
            "available_capacity": 45,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "COVISHIELD",
            "slots": [
                "08:30AM-09:30AM",
                "09:30AM-10:30AM",
                "10:30AM-11:30AM"
            ]
        },
        {
            "center_id": 9001,
            "name": "Lucknow Health Clinic",
            "address": "123 GHI Road, Lucknow",
            "state_name": "Uttar Pradesh",
            "district_name": "Lucknow",
            "block_name": "Not Applicable",
            "pincode": 226001,
            "from": "09:30:00",
            "to": "17:30:00",
            "lat": 26.8467,
            "long": 80.9462,
            "fee_type": "Free",
            "session_id": "session-9",
            "date": "06-09-2022",
            "available_capacity": 55,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "COVAXIN",
            "slots": [
                "09:30AM-10:30AM",
                "10:30AM-11:30AM",
                "11:30AM-12:30PM"
            ]
        },
        {
            "center_id": 10002,
            "name": "Bengaluru Health Center",
            "address": "789 DEF Road, Bengaluru",
            "state_name": "Karnataka",
            "district_name": "Bangalore Urban",
            "block_name": "Not Applicable",
            "pincode": 560002,
            "from": "10:00:00",
            "to": "18:00:00",
            "lat": 12.9716,
            "long": 77.5946,
            "fee_type": "Free",
            "session_id": "session-10",
            "date": "06-09-2022",
            "available_capacity": 60,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "COVISHIELD",
            "slots": [
                "10:00AM-11:00AM",
                "11:00AM-12:00PM",
                "12:00PM-01:00PM"
            ]
        },
        {
            "center_id": 11001,
            "name": "Kochi Health Clinic",
            "address": "123 JKL Road, Kochi",
            "state_name": "Kerala",
            "district_name": "Ernakulam",
            "block_name": "Not Applicable",
            "pincode": 682001,
            "from": "09:00:00",
            "to": "17:00:00",
            "lat": 9.9312,
            "long": 76.2673,
            "fee_type": "Free",
            "session_id": "session-11",
            "date": "06-09-2022",
            "available_capacity": 30,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "COVAXIN",
            "slots": [
                "09:00AM-10:00AM",
                "10:00AM-11:00AM",
                "11:00AM-12:00PM"
            ]
        },
        {
            "center_id": 12001,
            "name": "Chandigarh Medical Center",
            "address": "456 STU Road, Chandigarh",
            "state_name": "Chandigarh",
            "district_name": "Chandigarh",
            "block_name": "Not Applicable",
            "pincode": 160001,
            "from": "08:30:00",
            "to": "16:30:00",
            "lat": 30.7333,
            "long": 76.7794,
            "fee_type": "Free",
            "session_id": "session-12",
            "date": "06-09-2022",
            "available_capacity": 40,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "COVISHIELD",
            "slots": [
                "08:30AM-09:30AM",
                "09:30AM-10:30AM",
                "10:30AM-11:30AM"
            ]
        },

    	{
      "center_id": 21001,
      "name": "Agra Health Center",
      "address": "123 ABC Road, Agra",
      "state_name": "Uttar Pradesh",
      "district_name": "Agra",
      "block_name": "Not Applicable",
      "pincode": 282001,
      "from": "09:00:00",
      "to": "16:00:00",
      "lat": 27.1767,
      "long": 78.0081,
      "fee_type": "Free",
      "session_id": "session-21",
      "date": "07-09-2022",
      "available_capacity": 40,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVAXIN",
      "slots": [
        "09:00AM-10:00AM",
        "10:00AM-11:00AM",
        "11:00AM-12:00PM"
      ]
    },
    {
  "address": "789 XYZ Avenue, Mumbai",
  "available_capacity": 50,
  "block_name": "South Mumbai",
  "center_id": 6001,
  "date": "24-09-2022",
  "district_name": "Mumbai",
  "fee": "0",
  "fee_type": "Free",
  "from": "09:00:00",
  "lat": 19.076,
  "long": 72.8777,
  "min_age_limit": 18,
  "name": "Mumbai Health Center",
  "pincode": 400001,
  "session_id": "session-6",
  "slots": [
    "09:00AM-10:00AM",
    "10:00AM-11:00AM",
    "11:00AM-12:00PM"
  ],
  "state_name": "Maharashtra",
  "to": "17:00:00",
  "vaccine": "COVAXIN"
},

    {
      "center_id": 22001,
      "name": "Shimla Health Clinic",
      "address": "456 XYZ Street, Shimla",
      "state_name": "Himachal Pradesh",
      "district_name": "Shimla",
      "block_name": "Not Applicable",
      "pincode": 171001,
      "from": "09:00:00",
      "to": "17:00:00",
      "lat": 31.1048,
      "long": 77.1734,
      "fee_type": "Free",
      "session_id": "session-22",
      "date": "07-09-2022",
      "available_capacity": 35,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVISHIELD",
      "slots": [
        "09:00AM-10:00AM",
        "10:00AM-11:00AM",
        "11:00AM-12:00PM"
      ]
    },
    {
      "center_id": 23001,
      "name": "Darjeeling Vaccination Center",
      "address": "789 PQR Road, Darjeeling",
      "state_name": "West Bengal",
      "district_name": "Darjeeling",
      "block_name": "Not Applicable",
      "pincode": 734001,
      "from": "10:00:00",
      "to": "18:00:00",
      "lat": 27.0360,
      "long": 88.2627,
      "fee_type": "Free",
      "session_id": "session-23",
      "date": "07-09-2022",
      "available_capacity": 30,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVAXIN",
      "slots": [
        "10:00AM-11:00AM",
        "11:00AM-12:00PM",
        "12:00PM-01:00PM"
      ]
    },
    {
      "center_id": 24001,
      "name": "Goa Medical Center",
      "address": "123 MNO Road, Goa",
      "state_name": "Goa",
      "district_name": "North Goa",
      "block_name": "Not Applicable",
      "pincode": 403001,
      "from": "09:00:00",
      "to": "16:00:00",
      "lat": 15.2993,
      "long": 74.1240,
      "fee_type": "Free",
      "session_id": "session-24",
      "date": "07-09-2022",
      "available_capacity": 50,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVISHIELD",
      "slots": [
        "09:00AM-10:00AM",
        "10:00AM-11:00AM",
        "11:00AM-12:00PM"
      ]
    },
    {
      "center_id": 25001,
      "name": "Dehradun Health Clinic",
      "address": "456 GHI Road, Dehradun",
      "state_name": "Uttarakhand",
      "district_name": "Dehradun",
      "block_name": "Not Applicable",
      "pincode": 248001,
      "from": "09:30:00",
      "to": "17:30:00",
      "lat": 30.3165,
      "long": 78.0322,
      "fee_type": "Free",
      "session_id": "session-25",
      "date": "07-09-2022",
      "available_capacity": 60,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVAXIN",
      "slots": [
        "09:30AM-10:30AM",
        "10:30AM-11:30AM",
        "11:30AM-12:30PM"
      ]
    },
    {
      "center_id": 26001,
      "name": "Jammu Vaccination Center",
      "address": "123 STU Road, Jammu",
      "state_name": "Jammu and Kashmir",
      "district_name": "Jammu",
      "block_name": "Not Applicable",
      "pincode": 180001,
      "from": "10:00:00",
      "to": "18:00:00",
      "lat": 32.7266,
      "long": 74.8570,
      "fee_type": "Free",
      "session_id": "session-26",
      "date": "07-09-2022",
      "available_capacity": 40,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVISHIELD",
      "slots": [
        "10:00AM-11:00AM",
        "11:00AM-12:00PM",
        "12:00PM-01:00PM"
      ]
    },
    {
      "center_id": 27001,
      "name": "Trivandrum Health Center",
      "address": "456 RST Road, Trivandrum",
      "state_name": "Kerala",
      "district_name": "Thiruvananthapuram",
      "block_name": "Not Applicable",
      "pincode": 695001,
      "from": "09:00:00",
      "to": "16:00:00",
      "lat": 8.5241,
      "long": 76.9366,
      "fee_type": "Free",
      "session_id": "session-27",
      "date": "07-09-2022",
      "available_capacity": 45,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVAXIN",
      "slots": [
        "09:00AM-10:00AM",
        "10:00AM-11:00AM",
        "11:00AM-12:00PM"
      ]
    },
    {
      "center_id": 28001,
      "name": "Bhopal Medical Center",
      "address": "123 JKL Road, Bhopal",
      "state_name": "Madhya Pradesh",
      "district_name": "Bhopal",
      "block_name": "Not Applicable",
      "pincode": 462001,
      "from": "09:30:00",
      "to": "17:30:00",
      "lat": 23.2599,
      "long": 77.4126,
      "fee_type": "Free",
      "session_id": "session-28",
      "date": "07-09-2022",
      "available_capacity": 35,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVISHIELD",
      "slots": [
        "09:30AM-10:30AM",
        "10:30AM-11:30AM",
        "11:30AM-12:30PM"
      ]
    },
    {
      "center_id": 29001,
      "name": "Agartala Health Clinic",
      "address": "789 DEF Road, Agartala",
      "state_name": "Tripura",
      "district_name": "West Tripura",
      "block_name": "Not Applicable",
      "pincode": 799001,
      "from": "10:00:00",
      "to": "18:00:00",
      "lat": 23.8315,
      "long": 91.2868,
      "fee_type": "Free",
      "session_id": "session-29",
      "date": "07-09-2022",
      "available_capacity": 50,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVAXIN",
      "slots": [
        "10:00AM-11:00AM",
        "11:00AM-12:00PM",
        "12:00PM-01:00PM"
      ]
    },
    {
      "center_id": 30001,
      "name": "Bhubaneswar Vaccination Center",
      "address": "123 GHI Road, Bhubaneswar",
      "state_name": "Odisha",
      "district_name": "Khordha",
      "block_name": "Not Applicable",
      "pincode": 751001,
      "from": "09:00:00",
      "to": "16:00:00",
      "lat": 20.2961,
      "long": 85.8245,
      "fee_type": "Free",
      "session_id": "session-30",
      "date": "07-09-2022",
      "available_capacity": 40,
      "fee": "0",
      "min_age_limit": 18,
      "vaccine": "COVISHIELD",
        "slots": [
            "09:00AM-10:00AM",
            "10:00AM-11:00AM",
            "11:00AM-12:00PM"
        ]
    },
        {
            "center_id": 30001,
            "name": "Bhubaneswar Vaccination Center",
            "address": "123 GHI Road, Bhubaneswar",
            "state_name": "Odisha",
            "district_name": "Khordha",
            "block_name": "Not Applicable",
            "pincode": 751001,
            "from": "09:00:00",
            "to": "16:00:00",
            "lat": 20.2961,
            "long": 85.8245,
            "fee_type": "Free",
            "session_id": "session-30",
            "date": "12-03-2023",
            "available_capacity": 40,
            "fee": "0",
            "min_age_limit": 18,
            "vaccine": "SPUTNIK",
            "slots": [
                "09:00AM-10:00AM",
                "10:00AM-11:00AM",
                "11:00AM-12:00PM"
            ]
        }
    ]
}

@app.route('/api/data_vaccine', methods=['GET'])
def get_data():
    return jsonify(sample_data)

@app.route('/api/data_vaccine_csv', methods=['GET'])
def get_data_csv():
    # Define the CSV file path
    csv_file_path = 'vaccine_data.csv'

    # Extract the 'sessions' data from the sample_data
    sessions = sample_data.get('sessions', [])

    # Define the CSV column headers
    fieldnames = sessions[0].keys()

    # Write data to CSV file
    with open(csv_file_path, 'w', newline='') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(sessions)

    return f'Data has been exported to {csv_file_path}'

if __name__ == '__main__':  # Use double underscores here
    app.run(debug=True, port=8081)