import React from 'react';

const useMove = (callback :  (e: any)=> void) => {
    React.useEffect(() => {
        document.addEventListener('click', callback);
        return () => {
          document.removeEventListener('click', callback);
        };
      }, [callback]);
}

export default useMove;
