import os
import glob
import numpy
import argparse
import torchaudio
from speechbrain.pretrained import EncoderClassifier

import torch
from tqdm import tqdm
import torch.nn.functional as F



def create_target_xvector(single_wav_path):
    spk_model = {
        "speechbrain/spkrec-xvect-voxceleb": 512, 
        "speechbrain/spkrec-ecapa-voxceleb": 192,
    }
    # Parameters (normally passed as args)
    # single_wav_path = 'FEMALE VOICE.wav'  # specify the path to your .wav file
    spkemb_root = '.'  # specify your output directory for speaker embeddings
    speaker_embed = 'speechbrain/spkrec-xvect-voxceleb'  # specify your model identifier for loading the classifier

    # Ensure the output directory exists
    if not os.path.exists(spkemb_root):
        print(f"Create speaker embedding directory: {spkemb_root}")
        os.mkdir(spkemb_root)

    # Set up device and load model
    device = "cuda" if torch.cuda.is_available() else "cpu"
    classifier = EncoderClassifier.from_hparams(source=speaker_embed, run_opts={"device": device}, savedir=os.path.join('/tmp', speaker_embed))
    size_embed = 192  # Assuming size of the embedding, adjust based on your model's output

    # Function to extract embeddings; assuming you have this function defined as f2embed
    # Example: f2embed(file_path, classifier, embedding_size)
    def f2embed(file_path, model, emb_size):
        signal = model.load_audio(file_path)

        embeddings = model.encode_batch(signal)

        # print(embeddings)

        return embeddings.squeeze(0).cpu().detach().numpy()  # Move tensor to CPU and convert to NumPy array

    # Processing the single WAV file
    utt_id = os.path.basename(single_wav_path).replace(".wav", "")
    utt_emb = f2embed(single_wav_path, classifier, size_embed)
    
    return utt_emb

### LOAD MODEL
from transformers import SpeechT5Processor, SpeechT5ForSpeechToSpeech, SpeechT5HifiGan
from datasets import load_dataset

def load_voice_conversion_model():
    dataset = load_dataset("hf-internal-testing/librispeech_asr_demo", "clean", split="validation")
    dataset = dataset.sort("id")
    sampling_rate = dataset.features["audio"].sampling_rate
    # example_speech = dataset[0]["audio"]["array"] # this is the speaker 1 input!!!

    processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_vc")
    model = SpeechT5ForSpeechToSpeech.from_pretrained("microsoft/speecht5_vc")
    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")

    # inputs = processor(audio=example_speech, sampling_rate=sampling_rate, return_tensors="pt")
    
    return model

import soundfile as sf

def execute_voice_conversion(model, source_array, target_speaker_embeddings, output_name):
    speaker_embeddings = torch.tensor(target_speaker_embeddings)
    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")
    speech = model.generate_speech(source_array["input_values"], speaker_embeddings, vocoder=vocoder)

    sf.write(output_name, speech.numpy(), samplerate=16000)
    
import librosa
def generate_source_audio_array(file_path):
    
    
    # Load the audio file
    audio, sr = librosa.load(file_path, sr=16000)  # 'sr=None' loads the file with its original sampling rate

    # audio is the numpy array representing the audio signal
    # sr is the sampling rate of the audio

    print("Audio array:", audio)
    print("Sampling rate:", sr)
    processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_vc")
    model = SpeechT5ForSpeechToSpeech.from_pretrained("microsoft/speecht5_vc")
    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")
    NEW_INPUT = processor(audio=audio, sampling_rate=16000, return_tensors="pt")
    
    return NEW_INPUT    

# execute_voice_conversion(load_voice_conversion_model(), generate_source_audio_array("SOURCERECORDING.mp3"), 
#                         create_target_xvector("FEMALE VOICE.wav"), "YEEEE.wav")

import argparse

def main():
    parser = argparse.ArgumentParser(description="Process three inputs.")
    parser.add_argument('SOURCE_AUDIO', type=str, help='SOURCE_AUDIO')
    parser.add_argument('TARGET_SPEAKER_AUDIO', type=str, help='TARGET_SPEAKER_AUDIO')
    parser.add_argument('OUTPUT_FILENAME', type=str, help='OUTPUT_FILENAME')
    
    args = parser.parse_args()
    
    execute_voice_conversion(load_voice_conversion_model(), generate_source_audio_array(args.SOURCE_AUDIO), 
                         create_target_xvector(args.TARGET_SPEAKER_AUDIO), args.OUTPUT_FILENAME)

if __name__ == "__main__":
    main()