import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_NAME } from '@zenra/constants';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import { setAuthenticated } from '@zenra/store';
import { useDispatch } from 'react-redux';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    dispatch(setAuthenticated(false));
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div>
          <Link to="/" className={`text-2xl font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>
            {COMPANY_NAME}
          </Link>
        </div>

        <div className="hidden md:flex space-x-8">
          <Link
            to="/destinations"
            className={`${isScrolled
              ? isActive('/destinations') ? 'text-primary font-medium' : 'text-gray-600'
              : isActive('/destinations') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.destinations')}
          </Link>
          <Link
            to="/packages"
            className={`${isScrolled
              ? isActive('/packages') ? 'text-primary font-medium' : 'text-gray-600'
              : isActive('/packages') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.packages')}
          </Link>
          <Link
            to="/about"
            className={`${isScrolled
              ? isActive('/about') ? 'text-primary font-medium' : 'text-gray-600'
              : isActive('/about') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.about')}
          </Link>
          <Link
            to="/contact"
            className={`${isScrolled
              ? isActive('/contact') ? 'text-primary font-medium' : 'text-gray-600'
              : isActive('/contact') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.contact')}
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          {/* <Link
            to="/login"
            className={`${isScrolled
                ? isActive('/login') ? 'text-primary font-medium' : 'text-gray-600'
                : isActive('/login') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.login')}
          </Link> */}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={isScrolled ? 'text-gray-600' : 'text-white'}>
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </div>
        </button>
      </nav>

      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} ${isScrolled ? 'bg-white shadow-lg' : 'bg-black/90 backdrop-blur-sm'
          }`}
      >
        <div className="px-4 pt-4 pb-4 space-y-2">
          <Link
            to="/destinations"
            className={`block ${isScrolled
              ? isActive('/destinations') ? 'text-primary font-medium' : 'text-gray-600'
              : isActive('/destinations') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.destinations')}
          </Link>
          <Link
            to="/packages"
            className={`block ${isScrolled
              ? isActive('/packages') ? 'text-primary font-medium' : 'text-gray-600'
              : isActive('/packages') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.packages')}
          </Link>
          <Link
            to="/about"
            className={`block ${isScrolled
              ? isActive('/about') ? 'text-primary font-medium' : 'text-gray-600'
              : isActive('/about') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.about')}
          </Link>
          <Link
            to="/contact"
            className={`block ${isScrolled
              ? isActive('/contact') ? 'text-primary font-medium' : 'text-gray-600'
              : isActive('/contact') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.contact')}
          </Link>
          {/* <Link
            to="/login"
            className={`block ${isScrolled
                ? isActive('/login') ? 'text-primary font-medium' : 'text-gray-600'
                : isActive('/login') ? 'text-white font-medium' : 'text-white/80'
              } hover:${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}
          >
            {t('nav.login')}
          </Link> */}
          <div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};