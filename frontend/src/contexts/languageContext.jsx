import React, { createContext, useState, useContext } from 'react';

const translations = {
  es: {
    app_title: 'Archivista Cinemático',
    university_admin: 'Administración Universitaria',
    home: 'Inicio',
    genres: 'Géneros',
    directors: 'Directores',
    add_director: 'Añadir Director',
    edit_director: 'Editar Director',
    studios: 'Estudios',
    media: 'Multimedia',
    settings: 'Ajustes',
    recent_additions: 'Adiciones Recientes',
    sign_out: 'Cerrar Sesión',
    search_placeholder: 'Buscar archivo...',
    add_title: 'Añadir Nuevo Título',
    media_management: 'Gestión Multimedia',
    curate_library: 'Administra la biblioteca cinematográfica de la universidad',
    serial: 'Serial',
    poster: 'Póster',
    title_details: 'Título y Detalles',
    genre: 'Género',
    director: 'Director',
    status: 'Estado',
    actions: 'Acciones',
    showing: 'Mostrando',
    of: 'de',
    records: 'registros',
    previous: 'Anterior',
    next: 'Siguiente',
    film: 'PELÍCULA',
    series: 'SERIE',
    documentary: 'Documental',
    science: 'Ciencia',
    active: 'ACTIVO',
    pending: 'PENDIENTE',
    lang_btn: 'EN',
    types: 'Tipos',
    sign_in: 'Iniciar Sesión',
    sign_in_btn: 'Entrar',
    password: 'Contraseña',
    confirm_password: 'Confirmar Contraseña',
    login_error: 'Error al iniciar sesión',
    no_account: '¿No tienes cuenta?',
    register_here: 'Regístrate aquí',
    register_title: 'Crear Cuenta',
    register_btn: 'Registrarse',
    already_have_account: '¿Ya tienes cuenta?',
    login_here: 'Inicia sesión aquí',
    pwd_min_length: 'Mínimo 6 caracteres',
    pwd_mismatch: 'No coinciden',
  },
  en: {
    app_title: 'Cinematic Archivist',
    university_admin: 'University Admin',
    home: 'Home',
    genres: 'Genres',
    directors: 'Directors',
    add_director: 'Add Director',
    edit_director: 'Edit Director',
    studios: 'Studios',
    media: 'Media',
    settings: 'Settings',
    recent_additions: 'Recent Additions',
    sign_out: 'Sign Out',
    search_placeholder: 'Search archive...',
    add_title: 'Add New Title',
    media_management: 'Media Management',
    curate_library: "Curate the university's cinematic library",
    serial: 'Serial',
    poster: 'Poster',
    title_details: 'Title & Details',
    genre: 'Genre',
    director: 'Director',
    status: 'Status',
    actions: 'Actions',
    showing: 'Showing',
    of: 'of',
    records: 'records',
    previous: 'Previous',
    next: 'Next',
    film: 'FILM',
    series: 'SERIES',
    documentary: 'Documentary',
    science: 'Science',
    active: 'ACTIVE',
    pending: 'PENDING',
    lang_btn: 'ES',
    types: 'Types',
    sign_in: 'Sign In',
    sign_in_btn: 'Login',
    password: 'Password',
    confirm_password: 'Confirm Password',
    login_error: 'Invalid credentials',
    no_account: "Don't have an account?",
    register_here: 'Register here',
    register_title: 'Join Us',
    register_btn: 'Register',
    already_have_account: 'Already have an account?',
    login_here: 'Sign in here',
    pwd_min_length: 'Min 6 characters',
    pwd_mismatch: "Passwords don't match",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Spanish default

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
