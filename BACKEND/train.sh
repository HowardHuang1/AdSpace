#!/bin/bash

# Assign arguments to variables
video_file="$1"
image_file="$2"
output_path="$3"

# Check if variables are empty
if [[ -z "$video_file" || -z "$image_file" || -z "$output_path" ]]; then
  echo "Missing arguments. Usage: $0 <video_file> <image_file> <output_path>"
  exit 1
fi

# Activate Conda environment
source activate gc || { echo "Failed to activate Conda environment"; exit 1; }

# Run the Python script with the video, image, and output path
python run.py "$video_file" "$image_file" "$output_path"
