import { ReactComponent as LightModeIcon } from './icons/LightModeIcon.svg';
import { ReactComponent as DarkModeIcon } from './icons/DarkModeIcon.svg';
import { useEffect, useState } from 'react';
import tt from './theme-toggle.module.scss';
import { createPortal } from 'react-dom';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>();
  useEffect(() => {
    let currentTheme = localStorage.getItem('theme');
    currentTheme = currentTheme || 'dark';
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme || '');
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const updateTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  return (
    <>
      {createPortal(
        <>
          <meta name='theme-color' content={theme === 'dark' ? '#2c2c2e' : '#fafafa'} />
          <meta name='apple-mobile-web-app-status-bar-style' content={theme === 'dark' ? '#2c2c2e' : '#fafafa'} />
        </>,
        document.querySelector('head')!
      )}
      <button
        type='button'
        className={tt.theme_toggle}
        onClick={updateTheme}
        title='Toggle Theme'
        aria-label='Toggle Theme'
      >
        {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </button>
    </>
  );
};

export default ThemeToggle;
