import React, {useEffect, useState} from 'react';
import {Button, Descriptions, Divider, Image, message} from 'antd';
import {ModalForm, ProForm, ProFormText} from '@ant-design/pro-components';
import {selectAvatarUrl, selectGender} from '@/constant';
import {ProFormSelect} from '@ant-design/pro-form';
import {currentUser, modifyPassword, outLogin, userModify} from "@/services/ant-design-pro/api";
import {history} from "@@/core/history";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

function formatDate(dateTimeString: any) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}


const UserInfo: React.FC = () => {
  const [myUser, setMyUser] = useState({
    id: 0,
    username: '',
    userAccount: '',
    avatarUrl: '',
    gender: '男',
    phone: '',
    email: '',
    userStatus: 0,
    userRole: 0,
    createTime: '',
  });
  useEffect(() => {
    async function fetch() {
      await currentUser().then((res) => {
        // @ts-ignore
        setMyUser(res);
      });
    }

    fetch();
  }, []);
  console.log('currentUser:', myUser);
  return (
    <>
      <div>
        <Divider>用户头像</Divider>
        <Descriptions style={{marginLeft: '555px'}}>
          <Descriptions.Item>
            <Image src={myUser.avatarUrl} width={150} height={150}/>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{width: '50%'}}>
          <Divider>用户信息</Divider>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="用户名" style={{width: '20%', textAlign: 'center'}}>
              <div style={{textAlign: 'center'}}>
                {myUser.username}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="用户账号" style={{width: '20%', textAlign: 'center'}}>
              <div style={{textAlign: 'center'}}>
                {myUser.userAccount}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="用户性别" style={{width: '20%', textAlign: 'center'}}>
              <div style={{textAlign: 'center'}}>
                {myUser.gender}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="用户角色" style={{width: '20%', textAlign: 'center'}}>
              <div style={{textAlign: 'center'}}>
                {myUser.userRole === 0 ? '普通用户' : '管理员'}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="用户电话" style={{width: '20%', textAlign: 'center'}}>
              <div style={{textAlign: 'center'}}>
                {myUser.phone}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="用户邮箱" style={{width: '20%', textAlign: 'center'}}>
              <div style={{textAlign: 'center'}}>
                {myUser.email}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="用户状态" style={{width: '20%', textAlign: 'center'}}>
              <div style={{textAlign: 'center'}}>
                {myUser.userStatus === 0 ? '正常' : '异常'}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间" style={{width: '20%', textAlign: 'center'}}>
              <div style={{textAlign: 'center'}}>
                {formatDate(myUser.createTime)}
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>

      <ModalForm<API.CurrentUser>
        title="修改本用户信息"
        trigger={
          <Button type="primary" shape="round" style={{marginTop: '70px', marginLeft: '515px'}}>
            修改信息
          </Button>
        }
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(1000);
          //点击发起请求
          values.id = myUser.id;
          const isModify = await userModify(values);
          if (isModify) {
            message.success('修改成功');
            await waitTime(1000);
            // 刷新用户信息表单
            location.reload();
            return true;
          }
          return false;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            initialValue={myUser.username}
          />
          <ProFormText
            width="md"
            name="userAccount"
            label="用户账号"
            placeholder="请输入用户账号"
            initialValue={myUser.userAccount}
            rules={[
              {
                min: 4,
                type: 'string',
                message: '账号长度不能小于4位',
              },
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          />
          <ProFormSelect
            width="md"
            name="gender"
            label="性别"
            options={selectGender}
            placeholder="请选择性别"
            initialValue={myUser.gender}
          />
          <ProFormText
            width="md"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            initialValue={myUser.phone}
            rules={[
              {
                type: 'string',
                pattern: /^1[3456789]\d{9}$/,
                message: '请输入正确的手机号',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            initialValue={myUser.email}
            rules={[
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
              },
              {
                required: true,
                message: '请输入账号邮箱地址',
              },
            ]}
          />
          <ProFormSelect
            width="md"
            name="avatarUrl"
            label="用户头像"
            options={selectAvatarUrl}
            placeholder={'请选择用户头像 '}
            initialValue={myUser.avatarUrl}
          />
        </ProForm.Group>
      </ModalForm>

      <ModalForm<API.ModifyPasswordParam>
        title="修改密码"
        trigger={
          <Button danger shape="round" style={{margin: '50px'}}>
            修改密码
          </Button>
        }
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(1000);
          const {userPassword, newPassword} = values;
          if (userPassword === newPassword) {
            message.error('新密码不能与旧密码相同');
            return false;
          }
          values.id = myUser.id;
          //点击了提交
          const isModify = await modifyPassword(values);
          if (isModify) {
            message.success('修改成功');
            await waitTime(1000);
            //清除登录态,重新登录
            await outLogin();
            if (window.location.pathname !== '/user/login') {
              history.replace('/user/login');
            }
            return true;
          }
          return false;
        }}
      >
        <ProForm.Group>
          <ProFormText.Password
            width="md"
            name="userPassword"
            label="原密码"
            tooltip={'请输入本用户原密码'}
            rules={[{required: true}, {min: 8, message: '密码不会小于8位'}]}
            placeholder="请输入原密码"
          />
          <ProFormText.Password
            width="md"
            name="newPassword"
            label="新密码"
            tooltip={'请输入新密码，密码不得小于8位'}
            rules={[{required: true}, {min: 8, message: '新密码小于8位'}]}
            placeholder="请输入新密码"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default UserInfo;
