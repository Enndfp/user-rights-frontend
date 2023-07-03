import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ModalForm, ProFormSelect, ProFormText, ProTable} from '@ant-design/pro-components';
import {Button, Image, message, Popconfirm, Row, Space, Tag} from 'antd';
import {useRef, useState} from 'react';
import {deleteUser, searchUser, updateUserInfoByAdmin} from "@/services/ant-design-pro/api";
import {selectAvatarUrl, selectGender, selectUserRole, selectUserStatus} from "@/constant";
import Col from 'antd/es/grid/col';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

// @ts-ignore
const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: '序号',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
    align: 'center',
    render: (_, record, index) => (
      <Tag color="blue" style={{ borderRadius: '20px' }}>
        {index + 1}
      </Tag>
    ),
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    align: 'center',
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    copyable: true,
    align: 'center',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={50} height={50}/>
      </div>
    ),
    align: 'center',
    search: false
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    copyable: true,
    align: 'center',
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      '男': {text: <Tag color="success">男</Tag>},
      '女': {text: <Tag color="error">女</Tag>},
    },
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueEnum: {
      0: {text: <Tag color="success">正常</Tag>, status: 'Success'},
      1: {text: <Tag color="warning">注销</Tag>, status: 'Default'},
      2: {text: <Tag color="error">封号</Tag>, status: 'Error'},
    },
    align: 'center',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {text: <Tag color="default">普通用户</Tag>},
      1: {text: <Tag color="success">管理员</Tag>},
    },
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    align: 'center',
    search: false
  },
  {
    title: '操作',
    align: 'center',
    valueType: 'option',
    render: (text, record, _, action) => [
      <Space key="options" size="middle">
        <ModalForm
          title="修改用户信息"
          style={{ textAlign: 'center' }}
          trigger={<Button type="link">修改</Button>}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            await waitTime(1000);
            values.id = record.id;
            // @ts-ignore
            const isModify = await updateUserInfoByAdmin(values);
            if (isModify) {
              message.success('修改成功');
              await waitTime(1000);
              location.reload();
              return true;
            }
            return false;
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <ProFormText
                width="md"
                name="username"
                label="用户名"
                placeholder="请输入用户名"
                initialValue={record.username}
              />
            </Col>
            <Col xs={24} md={12}>
              <ProFormText
                width="md"
                name="userAccount"
                label="用户账号"
                placeholder="请输入账号"
                initialValue={record.userAccount}
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <ProFormText
                width="md"
                name="phone"
                label="手机号"
                placeholder="请输入手机号"
                initialValue={record.phone}
                rules={[
                  {
                    type: 'string',
                    pattern: /^1[3456789]\d{9}$/,
                    message: '请输入正确的手机号',
                  },
                ]}
              />
            </Col>
            <Col xs={24} md={12}>
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                placeholder="请输入邮箱"
                initialValue={record.email}
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <ProFormSelect
                width="md"
                name="gender"
                label="性别"
                options={selectGender}
                placeholder="请选择性别"
                initialValue={record.gender}
              />
            </Col>
            <Col xs={24} md={12}>
              <ProFormSelect
                width="md"
                name="avatarUrl"
                label="用户头像"
                options={selectAvatarUrl}
                placeholder="请选择用户头像"
                initialValue={record.avatarUrl}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <ProFormSelect
                width="md"
                name="userStatus"
                label="用户状态"
                options={selectUserStatus}
                initialValue={record.userStatus}
                placeholder="选择用户状态"
              />
            </Col>
            <Col xs={24} md={12}>
              <ProFormSelect
                width="md"
                name="userRole"
                label="用户角色"
                options={selectUserRole}
                initialValue={record.userRole}
                placeholder="选择用户角色"
              />
            </Col>
          </Row>
        </ModalForm>
        <Popconfirm
          key="delete"
          title="删除用户"
          onConfirm={async () => {
            const id = record.id;
            const isDelete = await deleteUser({ id: id } as API.DeleteParam);
            if (isDelete) {
              message.success('删除成功');
              await waitTime(1000);
              location.reload();
            } else {
              message.error('删除失败');
            }
          }}
          onCancel={(e) => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            删除
          </Button>
        </Popconfirm>
      </Space>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [pageSize, setPageSize] = useState(5);
  const showMessage = (text: string, type: 'success' | 'error') => {
    if (type === 'success') {
      message.success(text);
    }
  };

  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // @ts-ignore
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(1500);
        const userList = await searchUser(params);
        if (userList) {
          showMessage('查询成功', 'success');
        }
        return {
          data: userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          // @ts-ignore
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: pageSize,
        pageSizeOptions: ['5', '10'],
        showSizeChanger: true,
        onShowSizeChange: (current, size) => {
          setPageSize(size);
        },
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户列表"
    />
  );
};
