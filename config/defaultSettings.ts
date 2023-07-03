import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '用户权限系统',
  pwa: false,
  logo: 'https://enndfp-1317534445.cos.ap-guangzhou.myqcloud.com/img/logo.svg',
  iconfontUrl: '',
};

export default Settings;
