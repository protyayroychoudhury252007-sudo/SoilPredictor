from pathlib import Path
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import (RandomForestRegressor,ExtraTreesRegressor,GradientBoostingRegressor)
from sklearn.metrics import (mean_absolute_error,mean_squared_error,r2_score)

PROJECT_DIR = Path(__file__).resolve().parent.parent
DATASET_PATH = (PROJECT_DIR /"datasets" /"soil_quality_dataset.csv")
MODEL_DIR = PROJECT_DIR / "models"
MODEL_PATH = (MODEL_DIR /"soil_quality_model.joblib")

print("SOIL QUALITY MODEL TRAINING")
print(f"\nLoading dataset:\n{DATASET_PATH}")
df = pd.read_csv(DATASET_PATH)
print(f"\nDataset Shape: {df.shape}")

FEATURES = [
    "Nitrogen",
    "Phosphorus",
    "Potassium",
    "pH_Value",
    "Soil_Moisture",
    "Organic_Carbon",
    "Electrical_Conductivity",
    "Temperature",
    "Humidity",
    "Rainfall"
]
TARGET = "Soil_Quality"
X = df[FEATURES]
y = df[TARGET]

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.20,random_state=42)
print(f"\nTraining Samples: {len(X_train)}")
print(f"Testing Samples: {len(X_test)}")

models = {
    "Random Forest": RandomForestRegressor(n_estimators=300,random_state=42,n_jobs=-1),
    "Extra Trees": ExtraTreesRegressor(n_estimators=300,random_state=42,n_jobs=-1),
    "Gradient Boosting": GradientBoostingRegressor(n_estimators=300,random_state=42)
}

results = {}
best_model = None
best_model_name = None
best_r2 = -999

for name, model in models.items():
    print(f"Training: {name}")
    model.fit(X_train,y_train)
    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test,predictions)
    mse = mean_squared_error(y_test,predictions)
    rmse = mse ** 0.5
    r2 = r2_score(y_test,predictions)
    results[name] = {"MAE": mae,"RMSE": rmse,"R2": r2}
    print(f"MAE:  {mae:.3f}")
    print(f"RMSE: {rmse:.3f}")
    print(f"R² Score: {r2:.4f}")

    if r2 > best_r2:
        best_r2 = r2
        best_model = model
        best_model_name = name

print("MODEL COMPARISON")

for name, result in results.items():
    print(f"\n{name}")
    print(f"MAE: {result['MAE']:.3f}")
    print(f"RMSE: {result['RMSE']:.3f}")
    print(f"R²: {result['R2']:.4f}")

print(f"BEST MODEL: {best_model_name}")
print(f"BEST R² SCORE: {best_r2:.4f}")

MODEL_DIR.mkdir(parents=True,exist_ok=True)
joblib.dump(best_model,MODEL_PATH)
print("\nModel saved successfully!")
print(f"\nModel Path:\n{MODEL_PATH}")