import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load your .env file
load_dotenv()

api_key = os.getenv("GENAI_KEY") # Make sure this matches your .env variable name

if not api_key:
    print("Error: API Key not found. Check your .env file.")
else:
    genai.configure(api_key=api_key)

    print("Checking available models for your API key...")
    try:
        # Loop through all models and print only the ones that generate text
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"- {m.name}")
    except Exception as e:
        print(f"Error connecting to Google: {e}")