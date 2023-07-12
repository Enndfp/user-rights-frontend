// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: number;
    username?: string;
    userAccount: string;
    avatarUrl: string;
    gender?: string;
    phone?: string;
    email?: string;
    userStatus?: number;
    userRole?: number;
    createTime?: Date;
  };

  /**
   * 统一返回类型
   */
  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };
  type RegisterResult = number;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };
  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?:string;
    email?:string;
    code?:string;
    type?: string;
  };
  /**
   * 删除的参数
   */
  type DeleteParam = {
    id: number;
  };
  /**
   * 创建用户变量
   */
  type CreateParams = {
    username?: string;
    userAccount?: string;
    userPassword?: string;
    avatarUrl?: string;
    gender?: string;
    phone?: string;
    email?: string;
    userStatus?: number;
    createTime?: Date;
    userRole?: string;
  };
  /**
   * 修改密码的信息模板
   */
  type ModifyPasswordParam = {
    id?: number;
    userPassword: string;
    newPassword: string;
  };

  /**
   * 发送验证码
   */
  type SendMsgParam = {
    email: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
