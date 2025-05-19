const debounce = (fn, wait) => {
    let timeout;
    
    return function func(...args) {
      const id = () => {
        clearTimeout(timeout);
        fn(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(id, wait);
    };
  };
  
  export default debounce;