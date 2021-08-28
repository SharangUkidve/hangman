import Modal from './Modal';
import { ReactComponent as HelpIcon } from './HelpIcon.svg';
import t from './Theme/theme-toggle.module.scss';
import { memo, useEffect, useRef, useState } from 'react';

const InfoModal = () => {
  const [show, setShow] = useState<boolean>();
  const doneButton = useRef<HTMLButtonElement>(null);

  const toggleSetShow = () => setShow(!show);

  useEffect(() => {
    const hasPlayed = JSON.parse(localStorage.getItem('hasPlayed') ?? 'false');
    if (hasPlayed) {
      return;
    }
    setShow(!hasPlayed);
    localStorage.setItem('hasPlayed', 'true');
  }, []);

  useEffect(() => {
    if (show) {
      doneButton.current?.focus();
    }
  }, [show]);

  return (
    <>
      <button className={t.info_toggle} onClick={toggleSetShow} aria-label='Open How To'>
        <HelpIcon />
      </button>
      <Modal
        modalClass='info-modal'
        show={show!}
        onCloseClick={toggleSetShow}
        title={<h2 className='modal-title'>How To Play</h2>}
      >
        <p className='modal-caption'>You have to guess the letters to find a word.</p>
        <p className='modal-caption'>
          Vowels are masked with <q>*</q> and consonants with <q>_</q>.
        </p>
        <p className='modal-caption'>The word contains only valid English alphabets.</p>
        <button className='btn-play-again' onClick={toggleSetShow} ref={doneButton}>
          Got It!
        </button>
      </Modal>
    </>
  );
};

export default memo(InfoModal);
