import numpy as np
import argparse
import json
from datetime import datetime, timedelta

# Existing data
# data = [
#     {"timestamp": "2023-09-26T13:00:00.000Z", "temperature": 25.5, "humidity": 60.2},
#     {"timestamp": "2023-09-26T13:15:00.000Z", "temperature": 25.7, "humidity": 61},
#     {"timestamp": "2023-09-26T13:30:00.000Z", "temperature": 25.9, "humidity": 60.5},
#     {"timestamp": "2023-09-26T13:45:00.000Z", "temperature": 26.1, "humidity": 61.2},
# ]

# The data comes from the arguments
parser = argparse.ArgumentParser()
parser.add_argument("--data", help="The data to generate from")
args = parser.parse_args()
data = args.data

# convert the data to a list of dictionaries
data = eval(data)

blocked_keys = ["timestamp", "air_quality", "_id"]

# Number of additional data points to generate
num_data_points = 10

# Time increment (in minutes)
time_increment = 15  # Change to 5 for 5-minute increments

# Convert existing timestamps to datetime objects
existing_timestamps = [datetime.fromisoformat(item["timestamp"]) for item in data]

# Generate more data points with timestamps
generated_data = []
for i in range(num_data_points):
    new_data_point = {"timestamp": existing_timestamps[-1] + timedelta(minutes=time_increment)}
    for key in data[0].keys():
        if key not in blocked_keys:
            # Assume normally distributed values based on existing data
            mean = np.mean([item[key] for item in data])
            std = np.std([item[key] for item in data])
            new_value = np.random.normal(mean, std)
            new_data_point[key] = new_value
    generated_data.append(new_data_point)
    existing_timestamps.append(new_data_point["timestamp"])

# convert the data to JSON and print it
# But first convert the datetime objects to strings
for item in generated_data:
    item["timestamp"] = item["timestamp"].isoformat()
print(json.dumps(generated_data))
