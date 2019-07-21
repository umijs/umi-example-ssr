/**
 * title: Home
 */
import styles from './index.css';

function Page(props) {
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      <h2>csr: {props.data && props.data.csr}</h2>
    </div>
  );
}

Page.getInitialProps = async ({ store, route, isServer }) => {
  // console.log('Home getInitialProps', store, route, isServer);
  return Promise.resolve({
    data: {
      ssr: 'http://127.0.0.1:7001',
      csr: 'http://127.0.0.1:8000',
    },
  });
};

export default Page;
