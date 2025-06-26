import requests


def pollAI(user_content):
    url = "https://text.pollinations.ai/openai"
    availiable_models = ["openai-large", 'openai', 'openai-fast', 'qwen-coder', "grok", 'searchgpt']
    for model in availiable_models:
        try:
            payload = {
                "model": model, # Or "mistral", etc.
                "messages": [
                    {"role": "user", "content": user_content}
                ],
                "seed": 101,
                "temperature":0.1,
            }
            headers = {
                "Content-Type": "application/json"
            }

            response = requests.post(url, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()['choices'][0]['message']['content']
        except:
            continue

def chat(message):
    try:
        # 获取 AI 的回复
        ai_reply = pollAI(message)
    except:
        ai_reply = '大模型算力紧张，请稍后再试'

    return ai_reply





