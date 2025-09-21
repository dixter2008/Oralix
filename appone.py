from groq import Groq

client =Groq(api_key="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")
chat_completion = client.chat.completions.create(
    messages=[

        {
            "role": "system",
            "content": "You are a lesson summurizer"
        },
        {
            "role": "user",
            "content": "explain the 7 deadly sins",
        }
    ],
    model="llama-3.3-70b-versatile"

)

print(chat_completion.choices[0].message.content)
