import pandas as pd
import os
from typing import List, Dict, Any

class DataAnalysisAgent:
    def __init__(self, data_dir: str = "data"):
        self.data_dir = data_dir
        self.vehicles_file = os.path.join(data_dir, "synthetic_vehicle_data_vehicles.csv")
        self.sensors_file = os.path.join(data_dir, "synthetic_vehicle_data_sensors.csv")
        self.dtc_file = os.path.join(data_dir, "synthetic_vehicle_data_dtc.csv")
        self.maintenance_file = os.path.join(data_dir, "synthetic_vehicle_data_maintenance.csv")

    def analyze(self) -> List[Dict[str, Any]]:
        """
        Performs rule-based analysis on vehicle data.
        Returns a list of vehicle health reports.
        """
        # Load CSVs
        try:
            vehicles = pd.read_csv(self.vehicles_file)
            sensors = pd.read_csv(self.sensors_file)
            dtc = pd.read_csv(self.dtc_file)
            maintenance = pd.read_csv(self.maintenance_file)
        except FileNotFoundError as e:
            print(f"[ERROR] Data file not found: {e}")
            return []

        # ---- MERGE DATASETS ----
        df = vehicles.merge(sensors, on="VehicleID", how="left") \
                     .merge(dtc, on="VehicleID", how="left")

        maintenance_summary = maintenance.groupby("VehicleID").agg({
            "Cost": "sum",
            "ServiceType": "count"
        }).reset_index().rename(columns={"ServiceType": "no_of_maintenances", "Cost": "maintenance_cost"})

        df = df.merge(maintenance_summary, on="VehicleID", how="left")

        # Fill NaN values
        df["maintenance_cost"] = df["maintenance_cost"].fillna(0)
        df["no_of_maintenances"] = df["no_of_maintenances"].fillna(0)

        # ---- RULE 1: Maintenance Risk ----
        def maintenance_risk(row):
            risk = 0
            alerts = []
            if row["no_of_maintenances"] > 3:
                risk += 1
                alerts.append("High maintenance frequency")
            if row["maintenance_cost"] > 5000:
                risk += 1
                alerts.append("High maintenance cost")
            return risk, alerts

        # Apply Rule 1
        m_results = df.apply(maintenance_risk, axis=1)
        df["maintenance_risk"] = [res[0] for res in m_results]
        df["maintenance_alerts"] = [res[1] for res in m_results]

        # ---- RULE 2: Sensor-Based Risk ----
        def sensor_risk(row):
            risk = 0
            alerts = []
            if row["EngineTemp"] > 110:
                risk += 1
                alerts.append("Engine Overheating")
            if row["OilPressure"] < 20:
                risk += 1
                alerts.append("Low Oil Pressure")
            if row["BatteryVoltage"] < 12:
                risk += 1
                alerts.append("Low Battery Voltage")
            return risk, alerts

        # Apply Rule 2
        s_results = df.apply(sensor_risk, axis=1)
        df["sensor_risk"] = [res[0] for res in s_results]
        df["sensor_alerts"] = [res[1] for res in s_results]

        # ---- RULE 3: DTC Risk ----
        def dtc_risk(row):
            risk = 0
            alerts = []
            if pd.notna(row["Code"]):
                risk += 1
                alerts.append(f"DTC Found: {row['Code']}")
            return risk, alerts

        # Apply Rule 3
        d_results = df.apply(dtc_risk, axis=1)
        df["dtc_risk"] = [res[0] for res in d_results]
        df["dtc_alerts"] = [res[1] for res in d_results]

        # ---- FINAL CONDITION ----
        df["total_risk"] = df["maintenance_risk"] + df["sensor_risk"] + df["dtc_risk"]

        df["vehicle_status"] = df["total_risk"].apply(
            lambda x: "⚠ Needs Maintenance Soon" if x >= 2 else "✓ Normal"
        )

        # Convert to list of dicts for API response
        report = []
        for _, row in df.iterrows():
            report.append({
                "vehicle_id": row['VehicleID'],
                "model": row['Model'],
                "status": row['vehicle_status'],
                "total_risk_score": int(row['total_risk']),
                "alerts": {
                    "maintenance": row["maintenance_alerts"],
                    "sensor": row["sensor_alerts"],
                    "dtc": row["dtc_alerts"]
                }
            })
            
        return report

data_analysis_agent = DataAnalysisAgent()
