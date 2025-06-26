import sys, os
import ssl
import socketio
from fastapi import FastAPI, BackgroundTasks, Request, WebSocket
from fastapi.staticfiles import StaticFiles
import psutil
from pydantic import BaseModel
from config import ssl_path, ssl_crt, ssl_key
from chat import chat

class Message(BaseModel):
    text: str


app = FastAPI()

context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
if os.path.exists(ssl_path):
    context.load_cert_chain(ssl_crt, ssl_key)

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=['*'], ssl_context=context)
# sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
socket_app = socketio.ASGIApp(sio)

app.mount("/ws", socket_app)

    
@sio.event
async def connect(sid, environ):
    print('connected', sid)
    cpu_percent = psutil.cpu_percent(interval=1)  # 获取初始CPU使用率
    virtual_memory = psutil.virtual_memory()
    memory_percent = virtual_memory.percent
    print('Initial CPU Usage:', cpu_percent)  # 打印初始CPU使用率
    print('Initial Memory Usage:', memory_percent)
    data = {
        'cpu_percent': cpu_percent,
        'memory_percent': memory_percent
    }
    await sio.emit('usage', data)  # 推送初始CPU使用率给前端


@sio.event
async def disconnect(sid):
    print('disconnected', sid)


async def monitor():
    global running
    while running:
        cpu_percent = psutil.cpu_percent(interval=1)
        virtual_memory = psutil.virtual_memory()
        memory_percent = virtual_memory.percent
        data = {
        'cpu_percent': cpu_percent,
        'memory_percent': memory_percent
        }
        await sio.emit('usage', data)
        await sio.sleep(1)


@sio.on('start_monitor')
async def start_monitor(sid):
    print('Starting System monitor...')
    global running
    running = True
    sio.start_background_task(monitor)  # 后台任务用于持续获取CPU使用率


@sio.on('stop_monitor')
async def stop_monitor(sid):
    print('Stopping System monitor...')
    global running
    running = False


@sio.on('message')
async def receive_message(sid, message):
    # 在这里处理接收到的消息
    # 例如，可以调用 chat() 函数对消息进行处理
    # 然后将结果发送回前端使用 sio.emit() 方法
    # print(message)
    res = chat(message['message'])
    await sio.emit('response', res, to=sid)



if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000, ssl_certfile='/home/yahaha/think/ssl/letsthink.top_bundle.crt', ssl_keyfile='/home/yahaha/think/ssl/letsthink.top.key')



