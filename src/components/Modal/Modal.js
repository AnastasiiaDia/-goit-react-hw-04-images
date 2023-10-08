import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export default function Modal({ children, onCloseModal }) {
  useEffect(() => {
    const PressEscape = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', PressEscape);

    return () => window.removeEventListener('keydown', PressEscape);
  }, [onCloseModal]);

  const CloseModal = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={CloseModal}>
      <div className="modal">{children}</div>
    </Overlay>
  );
}
