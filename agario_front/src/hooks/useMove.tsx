import React from 'react';

const useMove = (callback :  (e: any)=> void) => {
    React.useEffect(() => {
        document.addEventListener('mousemove', callback);
        return () => {
          document.removeEventListener('mousemove', callback);
        };
      }, [callback]);
}

export default useMove;
