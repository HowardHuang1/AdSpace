import replicate
import argparse
import os
os.environ["REPLICATE_API_TOKEN"] = "r8_CxIwzX2eB2JMo2CAewiCBqeNMitCum14Xt3jS"

def main():
    
    parser = argparse.ArgumentParser(description="Process three inputs.")
    parser.add_argument('SOURCE_VIDEO', type=str, help='SOURCE_VIDEO')
    parser.add_argument('TARGET_AUDIO', type=str, help='TARGET_AUDIO')
    parser.add_argument('OUTPUT_FILENAME', type=str, help='OUTPUT_FILENAME')
    
    args = parser.parse_args()

    #Set the REPLICATE_API_TOKEN environment variable
    os.environ["REPLICATE_API_TOKEN"] = "r8_CxIwzX2eB2JMo2CAewiCBqeNMitCum14Xt3jS"

    face = open(args.SOURCE_VIDEO, "rb");
    input_audio = open(args.TARGET_AUDIO, "rb");

    input = {
        "face": face,
        "input_audio": input_audio
    }

    api = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
    output = api.run(
        "cjwbw/video-retalking:db5a650c807b007dc5f9e5abe27c53e1b62880d1f94d218d27ce7fa802711d67",
            input=input
        )
    for item in output:
        print(item, end="")

    import requests
    r = requests.get(output, stream=True)
    open(args.OUTPUT_FILENAME, 'wb').write(r.content)
    
if __name__ == "__main__":
    os.environ["REPLICATE_API_TOKEN"] = "r8_CxIwzX2eB2JMo2CAewiCBqeNMitCum14Xt3jS"
    main()