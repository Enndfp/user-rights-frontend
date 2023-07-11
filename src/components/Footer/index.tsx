import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {CSDN_LINK, GITEE_LINK, GITHUB_LINK} from "@/constant";
const Footer: React.FC = () => {
  const defaultMessage = 'Enndfp出品';
  const currentYear = new Date().getFullYear();
  const beian = '宁ICP备2023000742号-1';
  const beianUrl = 'https://beian.miit.gov.cn';
  return (
    <DefaultFooter
      // @ts-ignore
      copyright={
        <>
          {currentYear} {defaultMessage} |{' '}
          <a href={beianUrl} target="_blank" rel="noreferrer">
            {beian}
          </a>
        </>
      }
      links={[
        {
          key: 'csdn',
          title: 'CSDN',
          href: CSDN_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined />&nbsp;Enndfp Github</>,
          href: GITHUB_LINK,
          blankTarget: true,
        },
        {
          key: 'gitee',
          title: 'Gitee',
          href: GITEE_LINK,
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
