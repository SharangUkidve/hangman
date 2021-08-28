import { memo } from 'react';
import { ReactComponent as Hangman } from '../hangman.svg';
import InfoModal from './InfoModal';
import ThemeToggle from './Theme/ThemeToggle';

const Header = () => {
  return (
    <header className='header'>
      <a className='logo' href='/' aria-label='home'>
        <Hangman />
      </a>
      <h1 className='title'>Hangman</h1>
      <div className='toggle'>
        <InfoModal />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default memo(Header);
