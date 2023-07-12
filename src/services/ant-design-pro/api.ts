// @ts-ignore
/* eslint-disable */
import request  from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request <API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterParams>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 GET /api/user/search */
export async function searchUser(params?: { [key: string]: any }) {
  return request<API.CurrentUser[]>('/api/user/search', {
    method: 'GET',
    params
  });
}
/** 修改用户 POST /api/user/update/my */
export async function updateUserInfoByAdmin(
  body: API.CurrentUser,
  options?: { [key: string]: any },
) {
  console.log(body);
  return request<API.BaseResponse<boolean>>('/api/user/update', {
    method: 'POST',
    data: body,
    ...options,
  });
}
/** 修改用户 Post /api/user/update/my */
export async function userModify(
  body: API.CurrentUser,
  options?: { [key: string]: any },
) {
  console.log(body);
  return request<API.BaseResponse<boolean>>('/api/user/update/my', {
    method: 'POST',
    data: body,
    ...options,
  });
}
/** 修改密码 Post /api/user/modifyPassword */
export async function modifyPassword(
  body: API.ModifyPasswordParam,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse<boolean>>('/api/user/update/password', {
    method: 'POST',
    data: body,
    ...options,
  });
}
/** 发送验证码 Post /api/user/sendMsg */
export async function sendMsg(
  body: API.SendMsgParam,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse<boolean>>('/api/user/sendMsg', {
    method: 'POST',
    data: body,
    ...options,
  });
}
/** 删除用户 POST /api/user/delete */
export async function deleteUser(body: API.DeleteParam, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/delete', {
    method: 'POST',
    data: body,
    ...options,
  });
}
/** 新增用户接口 POST /api/user/create */
export async function create(body: API.CreateParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<Boolean>>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
