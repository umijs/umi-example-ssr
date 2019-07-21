/**
 * title: Count
 */
import React from 'react';
import { connect } from 'dva';
import styles from './count.css';

function Page(props) {
  React.useEffect(() => {
    return () => {
      props.dispatch({
        type: 'count/reset',
      })
    }
  }, []);
  return (
    <div className={styles.normal}>
      <h1>Page count</h1>
      <h2>count {props.count}</h2>
      <button onClick={() => {
        props.dispatch({
          type: 'count/add',
        });
      }}>Add</button>
    </div>
  );
}

Page.getInitialProps = async ({ store, route, isServer }) => {
  // console.log('Count getInitialProps', store, route, isServer);
  await store.dispatch({
    type: 'count/init',
  });
};

export default connect(state => {
  return {
    count: state.count,
  }
})(Page);
