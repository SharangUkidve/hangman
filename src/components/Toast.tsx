import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const Toast = ({ show, message, children }: PropsWithChildren<{ show: boolean; message: string }>) => {
  const portal = createPortal(
    <div className='toast-container'>
      <span className='toast-message'>{message}</span>
      {children}
    </div>,
    document.querySelector('body')!
  );
  return show ? portal : null;
};

export default Toast;
