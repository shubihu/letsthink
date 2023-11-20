import React from 'react';
import { Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <Typography>
        <Title level={2}>欢迎来到 Let's think 小破站</Title>
        <Paragraph>
          这是使用 React 和 Fastapi 开发的示例程序, 仅作为学习使用。
        </Paragraph>
        <Paragraph>
          服务器是薅的微软家的(1核1G, 新用户第一年免费), 域名是薅的硅云家的(新用户第一年免费), Logo是使用的是企鹅家的AIDesign免费设计的, 
          ssl证书是腾讯云提供一年免费证书, cdn是使用cloudflare的免费计划。
          所以这个网站整体就是免费薅来的, 后续嘛, 来日方长就先不考虑了, 薅完当下再说。
        </Paragraph>
        <Paragraph>
          开源地址: https://github.com/shubihu/letsthink.git
        </Paragraph>
        {/* <Button type="primary" size="large">Get Started</Button> */}
      </Typography>
    </div>
  );
};

export default WelcomePage;
