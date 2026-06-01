import os
import whisper  # type: ignore
import torch  # type: ignore

def main():
    print(f"CUDA Available: {torch.cuda.is_available()}")
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Loading Whisper on device: {device}...")
    model = whisper.load_model("tiny", device=device)
    
    file_path = "audio/01 Genesis 001.mp3"
    print(f"Transcribing first 40 seconds of {file_path} with word-level timestamps...")
    
    # We can transcribe just the first 40 seconds using clip/duration constraints or load audio
    # Let's transcribe the whole chapter but only print the first 40 seconds of word timestamps
    result = model.transcribe(file_path, language="en", word_timestamps=True)
    
    print("\n--- Word Timestamps (First 50 words) ---")
    count = 0
    for segment in result.get("segments", []):
        if "words" in segment:
            for w in segment["words"]:
                print(f"Word: {w['word']:<15} Start: {w['start']:.2f}s, End: {w['end']:.2f}s")
                count += 1
                if count >= 50:
                    break
        if count >= 50:
            break

if __name__ == "__main__":
    main()
