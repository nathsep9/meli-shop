import { useCallback, useEffect, useRef, useState } from 'react';

import CloseIcon from './CloseIcon';
import { STORAGE_KEY } from './constants';
import { WelcomeAlertProps } from './types';

import './WelcomeAlert.scss';


const WelcomeAlert = ({ anchorRef, title, description }: WelcomeAlertProps) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const alertRef = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY) && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: 50,
        left: 520,
      });
      setVisible(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  }, [anchorRef]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={alertRef}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: 'absolute',
        zIndex: 1000,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="welcome-alert__arrow" />
      <div className="welcome-alert__content">
        <div className="welcome-alert__header">
          <strong>{title}</strong>
          <button className="welcome-alert__close" onClick={handleClose}>
            <CloseIcon className="welcome-alert__icon" />
          </button>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default WelcomeAlert;
