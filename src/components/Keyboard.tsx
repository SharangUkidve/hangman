import { memo } from 'react';
import '../sass/keyboard.scss';

const keyMap = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const Keyboard = ({
  active,
  onChange,
  disabledKeys,
  word,
}: {
  active: boolean;
  onChange: (...args: any[]) => any;
  disabledKeys: string[];
  word: string;
}) => {
  const getKeyClass = (key: string) => {
    return disabledKeys.includes(key) ? (word.includes(key) ? ' correct' : ' incorrect') : '';
  };
  return active ? (
    <div className='keyboard'>
      {keyMap.map((keyRow, index) => (
        <div className='keyboard-row' key={index}>
          {keyRow.map(key => (
            <button
              key={key}
              className={`keyboard-key${getKeyClass(key)}`}
              onClick={e => onChange(key)}
              disabled={disabledKeys.includes(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  ) : null;
};

export default memo(Keyboard);
