from pathlib import Path
import sys
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


# =========================================================
# PROJECT PATH
# =========================================================

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent

MODEL_DIR = PROJECT_DIR / "models"
MODEL_PATH = MODEL_DIR / "soil_type_model.joblib"


print("\n" + "=" * 60)
print("SOIL TYPE PREDICTION MODEL TRAINING")
print("=" * 60)

print(f"\nScript Directory:\n{SCRIPT_DIR}")
print(f"\nProject Directory:\n{PROJECT_DIR}")


# =========================================================
# AUTOMATICALLY FIND CSV FILE
# =========================================================

print("\nSearching for CSV files in the project...\n")

# Search recursively through the complete project
csv_files = list(PROJECT_DIR.rglob("*.csv"))
csv_files += list(PROJECT_DIR.rglob("*.CSV"))

# Remove duplicates
csv_files = list(set(csv_files))


print("CSV files found:")

if csv_files:
    for i, file in enumerate(csv_files, 1):
        print(f"{i}. {file}")
else:
    print("No CSV files found.")


if not csv_files:
    print("\nERROR: No CSV dataset was found anywhere in the project!")

    print("\nMake sure your CSV file is inside:")
    print(PROJECT_DIR)

    sys.exit(1)


# =========================================================
# SELECT THE CORRECT CSV
# =========================================================

# Prefer files containing sensor/crop/dataset in the name
preferred_files = [
    file for file in csv_files
    if (
        "sensor" in file.name.lower()
        or "soil" in file.name.lower()
        or "dataset" in file.name.lower()
    )
]

if preferred_files:
    DATASET_PATH = preferred_files[0]
else:
    DATASET_PATH = csv_files[0]


print("\n" + "=" * 60)
print("SELECTED DATASET")
print("=" * 60)

print(f"\nDataset:\n{DATASET_PATH}")


# =========================================================
# LOAD DATASET
# =========================================================

print("\nLoading dataset...")

try:
    df = pd.read_csv(DATASET_PATH)
    print("Dataset loaded successfully! ✅")

except Exception as e:
    print("\nERROR while loading dataset:")
    print(e)
    sys.exit(1)


# =========================================================
# CLEAN COLUMN NAMES
# =========================================================

df.columns = df.columns.astype(str).str.strip()


print("\n" + "=" * 60)
print("DATASET INFORMATION")
print("=" * 60)

print(f"\nDataset Shape: {df.shape}")

print("\nColumns Found:")

for column in df.columns:
    print(f" - {column}")

print("\nFirst 5 rows:")
print(df.head())


# =========================================================
# REQUIRED FEATURES
# =========================================================

FEATURES = [
    "Nitrogen",
    "Phosphorus",
    "Potassium",
    "Temperature",
    "Humidity",
    "pH_Value",
    "Rainfall",
    "Crop"
]

TARGET = "Soil_Type"

required_columns = FEATURES + [TARGET]


# =========================================================
# VALIDATE COLUMNS
# =========================================================

missing_columns = [
    column for column in required_columns
    if column not in df.columns
]

if missing_columns:

    print("\n" + "=" * 60)
    print("ERROR: MISSING REQUIRED COLUMNS")
    print("=" * 60)

    print("\nMissing:")
    for column in missing_columns:
        print(f" - {column}")

    print("\nAvailable:")
    for column in df.columns:
        print(f" - {column}")

    sys.exit(1)


# =========================================================
# CLEAN DATA
# =========================================================

print("\n" + "=" * 60)
print("DATA CLEANING")
print("=" * 60)

print("\nMissing values:")
print(df[required_columns].isnull().sum())


rows_before = len(df)

df = df.dropna(subset=required_columns)

df = df.drop_duplicates()

rows_after = len(df)

print(f"\nRows before cleaning: {rows_before}")
print(f"Rows after cleaning: {rows_after}")
print(f"Rows removed: {rows_before - rows_after}")


if len(df) < 20:
    print("\nERROR: Not enough data for training!")
    sys.exit(1)


# =========================================================
# PREPARE X AND Y
# =========================================================

X = df[FEATURES].copy()
y = df[TARGET].copy()


print("\n" + "=" * 60)
print("SOIL TYPE DISTRIBUTION")
print("=" * 60)

print(y.value_counts())


if y.nunique() < 2:
    print("\nERROR: At least 2 soil types are required!")
    sys.exit(1)


# =========================================================
# FEATURE GROUPS
# =========================================================

NUMERICAL_FEATURES = [
    "Nitrogen",
    "Phosphorus",
    "Potassium",
    "Temperature",
    "Humidity",
    "pH_Value",
    "Rainfall"
]

CATEGORICAL_FEATURES = [
    "Crop"
]


# =========================================================
# TRAIN / TEST SPLIT
# =========================================================

print("\n" + "=" * 60)
print("SPLITTING DATA")
print("=" * 60)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print(f"\nTraining samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")


# =========================================================
# PREPROCESSING
# =========================================================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "numerical",
            "passthrough",
            NUMERICAL_FEATURES
        ),
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            CATEGORICAL_FEATURES
        )
    ]
)


# =========================================================
# MODEL
# =========================================================

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1,
    class_weight="balanced"
)


# =========================================================
# PIPELINE
# =========================================================

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model)
    ]
)


# =========================================================
# TRAIN
# =========================================================

print("\n" + "=" * 60)
print("TRAINING MODEL")
print("=" * 60)

print("\nTraining Random Forest...")

pipeline.fit(X_train, y_train)

print("\nTraining completed successfully! ✅")


# =========================================================
# EVALUATION
# =========================================================

print("\n" + "=" * 60)
print("MODEL EVALUATION")
print("=" * 60)

y_pred = pipeline.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print(f"\nAccuracy: {accuracy * 100:.2f}%")


print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)


# =========================================================
# CONFUSION MATRIX
# =========================================================

labels = sorted(y.unique())

cm = confusion_matrix(
    y_test,
    y_pred,
    labels=labels
)

cm_df = pd.DataFrame(
    cm,
    index=labels,
    columns=labels
)

print("\nConfusion Matrix:")
print("Rows = Actual | Columns = Predicted\n")

print(cm_df)


# =========================================================
# SAVE MODEL
# =========================================================

MODEL_DIR.mkdir(
    parents=True,
    exist_ok=True
)

joblib.dump(
    pipeline,
    MODEL_PATH
)

print("\n" + "=" * 60)
print("MODEL SAVED SUCCESSFULLY! ✅")
print("=" * 60)

print(f"\nModel saved at:\n{MODEL_PATH}")


# =========================================================
# SAMPLE PREDICTION
# =========================================================

print("\n" + "=" * 60)
print("SAMPLE PREDICTION")
print("=" * 60)


sample_data = pd.DataFrame([{
    "Nitrogen": 70,
    "Phosphorus": 40,
    "Potassium": 80,
    "Temperature": 28,
    "Humidity": 65,
    "pH_Value": 6.5,
    "Rainfall": 1200,
    "Crop": "Wheat",
}])


prediction = pipeline.predict(sample_data)[0]

probabilities = pipeline.predict_proba(sample_data)[0]

confidence = probabilities.max() * 100


print(f"\nPredicted Soil Type: {prediction}")
print(f"Confidence: {confidence:.2f}%")


print("\n" + "=" * 60)
print("TRAINING COMPLETED SUCCESSFULLY 🌱")
print("=" * 60)

print(f"\nFinal Test Accuracy: {accuracy * 100:.2f}%")