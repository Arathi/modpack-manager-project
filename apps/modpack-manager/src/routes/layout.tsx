import { Flex } from 'antd';
import { Outlet, useNavigate } from '@modern-js/runtime/router';
import './app.scss';

const Navigator = () => {
  return (
    <Flex className="navigator" justify="center" align="center">
      <Link to="/">首页</Link>
      <Link to="/search">模组搜索</Link>
      <Link to="/modpacks">整合包</Link>
    </Flex>
  );
};

type LinkProps = {
  to: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};
const Link: React.FC<LinkProps> = ({ to, style, children }) => {
  const navigate = useNavigate();
  return (
    <div className="link" style={style} onClick={() => navigate(to)}>
      {children}
    </div>
  );
};

export default function Layout() {
  return (
    <Flex className="app" vertical>
      <Navigator />
      <Flex flex={1} justify="center" align="center">
        <Outlet />
      </Flex>
    </Flex>
  );
}
