import { memo } from 'react';
import '../sass/hangman.scss';

const Hangman = ({ errors, dead }: { errors: number; dead?: boolean }) => {
  return (
    <svg className='hangman'>
      <g id='stand'>
        {errors > 0 && <line id='base' x1='50' y1='250' x2='150' y2='250' />}
        {errors > 1 && <line id='stand-v' x1='100' y1='250' x2='100' y2='20' />}
        {errors > 2 && <line id='stand-h' x1='100' y1='20' x2='200' y2='20' />}
        {errors > 3 && <line id='rope' x1='200' y1='20' x2='200' y2={dead ? 160 : 60} />}
      </g>
      <g id='body' transform={dead ? 'translate(0 100)' : 'translate(0 0)'}>
        <g id='head'>
          {errors > 4 && (
            <>
              <circle className='face' cx='200' cy='80' r='20' />
              {dead ? (
                <g>
                  <line x1='190' y1='78' x2='196' y2='84' />
                  <line x1='204' y1='78' x2='210' y2='84' />
                  <line x1='190' y1='84' x2='196' y2='78' />
                  <line x1='204' y1='84' x2='210' y2='78' />
                </g>
              ) : (
                <g>
                  <circle cx='193' cy='80' r='4' className='eyes' />
                  <circle cx='207' cy='80' r='4' className='eyes' />
                </g>
              )}
            </>
          )}
        </g>
        {errors > 5 && <line x1='200' y1='100' x2='200' y2='150' />}
        {errors > 6 && <line id='armL' x1='200' y1='120' x2='170' y2='140' />}
        {errors > 7 && <line id='armR' x1='200' y1='120' x2='230' y2='140' />}
        {errors > 8 && <line id='legL' x1='200' y1='150' x2='180' y2='190' />}
        {errors > 9 && <line id='legR' x1='200' y1='150' x2='220' y2='190' />}
      </g>
    </svg>
  );
};

export default memo(Hangman);
