FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt requirements.txt

RUN apt update && \
    apt install -y gcc python3-dev
    
RUN python -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn

COPY . .
