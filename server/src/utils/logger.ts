const info = (...params: (string | number)[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params: string[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

export default {
  info,
  error,
};
