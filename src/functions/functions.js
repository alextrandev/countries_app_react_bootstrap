
// debounce function
function debounce(func, timeout = 450) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

  export {debounce};