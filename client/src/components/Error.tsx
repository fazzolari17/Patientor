import React from 'react';

interface Props {
  message: string;
}

const Error = ({ message }: Props) => {
  const style = {
    container: {
      border: '5px solid red',
      padding: '1rem',
    },
    text: {
      // color: 'red'
    },
  };

  return (
    <>
      <div style={style.container}>
        <h1 style={style.text}>{message}</h1>
      </div>
    </>
  );
};

export default Error;
