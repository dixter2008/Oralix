from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

app = Flask(__name__)
CORS(app)

# Use your actual Groq API key
API_KEY = "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"
client = Groq(api_key=API_KEY)

@app.route("/")
def home():
    return "<h1>Welcome to the Summarizer API</h1><p>Use the /summarize endpoint with a POST request to summarize text.</p>"

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    user_input = data.get("text", "")

    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a lesson summarizer, do not use asterisk."},
            {"role": "user", "content": "summarize the following: " + user_input}
        ],
        model="llama-3.3-70b-versatile"
    )

    summary = chat_completion.choices[0].message.content
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)