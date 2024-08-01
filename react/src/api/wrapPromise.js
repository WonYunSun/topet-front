function wrapPromise(promise) {
    let status = 'pending';
    let result;
    let error;
  
    const suspend = promise
      .then((res) => {
        status = 'fulfilled';
        result = res;
      })
      .catch((err) => {
        status = 'rejected';
        error = err;
      });
  
    return {
      read() {
        if (status === 'pending') throw suspend;
        else if (status === 'fulfilled') return result;
        else throw error;
      }
    };
}

export default wrapPromise;