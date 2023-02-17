import React from 'react';

const Home = () => {
  const style = {
    flex: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <section style={style.flex}>
      <h2>Welcome the the Patient Portal</h2>
      <h3>Log in to explore the app</h3>
    </section>
  );
};

export default Home;
