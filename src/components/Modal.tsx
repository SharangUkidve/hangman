import { PropsWithChildren, UIEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../sass/modal.scss';

interface ModalProps {
  show: boolean;
  onCloseClick?: (e: UIEvent) => any;
  title?: JSX.Element | string;
  buttonLabel?: JSX.Element | string;
  showClose?: boolean;
  modalClass?: string;
}

const Modal = ({
  show,
  onCloseClick,
  children,
  title,
  buttonLabel = 'close',
  showClose = false,
  modalClass,
}: PropsWithChildren<ModalProps>) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className='modal-overlay' onClick={onCloseClick}>
      <div className={`modal${modalClass ? ' ' + modalClass : ''}`} onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          {title}
          {showClose && (
            <button className='btn-icon' onClick={onCloseClick} ref={ref}>
              {buttonLabel}
            </button>
          )}
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

const ModalPortal = ({ show, ...props }: PropsWithChildren<ModalProps>) => {
  return show ? createPortal(<Modal show={show} {...props} />, document.querySelector('body')!) : null;
};
export default ModalPortal;
