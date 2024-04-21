import replicate

import os
import replicate

#Set the REPLICATE_API_TOKEN environment variable
os.environ["REPLICATE_API_TOKEN"] = "r8_T9PfJtLkQ78rrCVgqAECInQNWumxEpk0tsrL4"

face = open("SUCCESS-2.mp4", "rb");
input_audio = open("FEMALE VOICE.wav", "rb");

input = {
    "face": face,
    "input_audio": input_audio
}

print("loaded, now calling")

api = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
output = api.run(
    "cjwbw/video-retalking:db5a650c807b007dc5f9e5abe27c53e1b62880d1f94d218d27ce7fa802711d67",
        input=input
    )
for item in output:
    print(item, end="")
    
import requests
r = requests.get(output, stream=True)
open('localfile.mp4', 'wb').write(r.content)