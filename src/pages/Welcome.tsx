import {PageContainer} from '@ant-design/pro-components';
import {Alert, Card, Typography} from 'antd';
import React from 'react';
import {SecurityScanTwoTone} from "@ant-design/icons";

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'努力打造为最好的用户权限系统'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Title
          level={1}
          style={{
            textAlign: 'center',
          }}
        >
          <SecurityScanTwoTone /> 用户权限系统
        </Typography.Title>
      </Card>
      <img src='https://img.enndfp.cn/hhw.jpg' style={{
        marginTop:'5px',
        maxWidth:'100%'
      }}/>
    </PageContainer>
  );
};
export default Welcome;
