这是使用 React 和 Fastapi 开发的示例程序, 仅作为学习使用, 后续会依据情况慢慢添加更多的组件。

### 网站demo
https://letsthink.top

### 使用方法

#### 后端
- 安装依赖
```
cd backend
pip install -r requirements.txt
```
- 测试运行
```
uvicorn fastapiApp:app --reload
```

#### 前端
- 安装依赖
`npm install`
- 修改 env 环境变量

    开发环境: .env.development

    生产环境: .env.production
    
- 测试运行
`npm run start`
- 生产部署
`npm run build`

### Docker
```
git clone https://github.com/shubihu/letsthink.git
docker-compose up -d --build
```
