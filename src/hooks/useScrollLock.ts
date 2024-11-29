import { useEffect } from 'react';

const useScrollLock = () => {
  useEffect(() => {
    // Save initial overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Restore original overflow on cleanup
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
};

export default useScrollLock;
