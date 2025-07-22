import React, { useRef, useState } from 'react';

import WelcomeAlert from '../WelcomeAlert';
import SearchIcon from './icons/SearchIcon';
import { NavbarProps } from './types';

import './Navbar.scss';

const Navbar = ({ onSearch }: NavbarProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (input) {
      params.set('search', input);
      params.delete('page');
    } else {
      params.delete('search');
      params.delete('page');
    }
    window.history.pushState({}, '', `/?${params.toString()}`);
    if (onSearch) onSearch(input);
    document.title = `${input} - Meli Shop`;
  };

  return (
    <header className="root-navbar">
      <div className="root-navbar__container">
        <a href="/" className="root-navbar__logo">
          <img src="/logo.png" alt="Logo" className="root-navbar__logo-image" />
        </a>
        <div className="root-navbar__form-wrapper">
          <form className="root-navbar__form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              name="search"
              placeholder="Buscar productos, marcas y más..."
              className="root-navbar__input"
              value={input}
              onChange={handleChange}
            />
            <button ref={buttonRef} type="submit" className="root-navbar__button">
              <SearchIcon className="root-navbar__icon" />
            </button>
          </form>
          <WelcomeAlert
            anchorRef={buttonRef}
            title="Hola"
            description="Para realizar búsquedas, solo debes ingresar el nombre de lo que necesites. Pueden ser productos, marcas y más..."
          />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
