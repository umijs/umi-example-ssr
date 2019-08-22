import { Menu } from 'antd';
import { Link } from 'umi';
import styles from './index.css';

function Page(props) {
  return (
    <div className={styles.normal}>
      <Menu selectedKeys={[props.location.pathname]} mode="horizontal">
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/users">
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="/count">
          <Link to="/count">Count</Link>
        </Menu.Item>
      </Menu>
      {props.children}
    </div>
  );
}

export default Page;
