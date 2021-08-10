export const promisify = fn => (...args) =>
  new Promise((resolve, reject) => {
    fn(...args, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
