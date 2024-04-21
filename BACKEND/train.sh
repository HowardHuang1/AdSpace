#!/bin/bash

video_file = $1
image_file = $2
output_path = $3

# Activate Conda environment
source activate gc

# Run the Python script with arguments
python run.py $video_file $image_file $output_path
