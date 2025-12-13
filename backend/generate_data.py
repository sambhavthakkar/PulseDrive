import pandas as pd
import random
import os

# Ensure directory exists
os.makedirs("data", exist_ok=True)

# 1. Vehicles
vehicles_data = {
    "VehicleID": [f"V{i}" for i in range(101, 111)],
    "Model": ["Tesla Model 3", "Ford F-150", "Toyota Camry", "Honda Civic", "BMW X5", 
              "Audi Q7", "Mercedes C-Class", "Jeep Wrangler", "Hyundai Tucson", "Kia Sportage"],
    "Year": [random.randint(2018, 2024) for _ in range(10)]
}
df_vehicles = pd.DataFrame(vehicles_data)
df_vehicles.to_csv("data/synthetic_vehicle_data_vehicles.csv", index=False)

# 2. Sensors
sensors_data = {
    "VehicleID": [f"V{i}" for i in range(101, 111)],
    "EngineTemp": [random.randint(80, 120) for _ in range(10)], # Some overheating (>110)
    "OilPressure": [random.randint(15, 60) for _ in range(10)], # Some low (<20)
    "BatteryVoltage": [random.uniform(11.0, 14.5) for _ in range(10)] # Some low (<12)
}
df_sensors = pd.DataFrame(sensors_data)
df_sensors.to_csv("data/synthetic_vehicle_data_sensors.csv", index=False)

# 3. DTC (Diagnostic Trouble Codes)
dtc_data = {
    "VehicleID": [f"V{i}" for i in range(101, 111)],
    "Code": [random.choice(["P0300", "P0171", "P0420", None, None, None]) for _ in range(10)]
}
df_dtc = pd.DataFrame(dtc_data)
df_dtc.to_csv("data/synthetic_vehicle_data_dtc.csv", index=False)

# 4. Maintenance
maintenance_records = []
for vid in [f"V{i}" for i in range(101, 111)]:
    num_records = random.randint(0, 5)
    for _ in range(num_records):
        maintenance_records.append({
            "VehicleID": vid,
            "ServiceType": random.choice(["Oil Change", "Brake Pad Replacement", "Tire Rotation", "Battery Check"]),
            "Cost": random.randint(100, 2000),
            "Date": "2024-01-01"
        })

df_maintenance = pd.DataFrame(maintenance_records)
df_maintenance.to_csv("data/synthetic_vehicle_data_maintenance.csv", index=False)

print("Synthetic data generated in 'data/' folder.")
