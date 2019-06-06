import styles from './users.css';

function Page(props) {
  return (
    <div className={styles.normal}>
      <h1>Page users</h1>
      <h2>users</h2>
      <ul>
        { (props.data.list || []).map(user => <li key={user}>{user}</li>) }
      </ul>
    </div>
  );
}

Page.getInitialProps = async () => {
  console.log('Users getInitialProps');
  return Promise.resolve({
    data: {
      list: ['foo', 'bar'],
    },
  });
};

export default Page;
