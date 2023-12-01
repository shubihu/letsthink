### 安装依赖
```
pip install -r requirements.txt
```

如果有ssl证书，需要配置 config.py 中对应的变量

### 测试运行
```
uvicorn fastapiApp:app --reload
```