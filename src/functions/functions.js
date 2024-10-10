
// debounce function
function debounce(func, timeout = 450) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

// capitalie string
function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1); 
}

export {debounce, capitalize};