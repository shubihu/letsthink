import openai

openai.api_key = "*****"    # Azure 的密钥
openai.api_base = "https://digitalgeneai.openai.azure.com/"  # Azure 的终结点
openai.api_type = "azure" 
openai.api_version = "2023-03-15-preview" # API 版本，未来可能会变
model = "*****"  # 模型的部署名

from sparkdesk_api.core import SparkAPI
# 默认api接口版本为3.1，配置其他版本需要指定Version参数（2.1或者1.1）
sparkAPI = SparkAPI(
    app_id='*****',
    api_secret='*****',
    api_key='*****',
    # version=2.1
)

# sparkAPI.chat("hello")

dialogue_history = [{"role": "system", "content": "You are a helpful assistant."}]

def chat(message):
    # 系统信息（system）：用于设定助手的表现。
    # 助手信息（assistant）：助手回复的信息。（用于多轮对话）
    # 用户信息（user）：用户的聊天、问题信息。   
    # 构建对话历史记录
    prompt = message['message']
    if message['messageLen'] == 0:
        global dialogue_history
        dialogue_history = [{"role": "system", "content": "You are a helpful assistant."}]
    dialogue_history.append({'role': 'user', 'content': prompt})

    # 调用 OpenAI API 进行对话
    try:
        response = openai.ChatCompletion.create(
                engine=model,
                messages = dialogue_history,
                temperature=0.2,
                max_tokens=800,
                top_p=0.95,
                frequency_penalty=0,
                presence_penalty=0,
                stop=None)
    
        # 获取 AI 的回复
        ai_reply = response['choices'][0]['message']['content'].strip()
        dialogue_history.append({"role": "assistant", "content": ai_reply})
    except:
        ai_reply = ''

    return ai_reply

def chatSpark(message):
    ai_reply = sparkAPI.chat(message['message'])
    return ai_reply



