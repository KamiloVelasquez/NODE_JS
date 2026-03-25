import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useLanguage } from '../contexts/languageContext';
import '../styles/login.css';

/**
 * Register Page
 * Handles new user account creation.
 */
const Register = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password.length < 6) {
            setError(t('pwd_min_length') || 'Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError(t('pwd_mismatch') || 'Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await authAPI.register({
                email: formData.email,
                password: formData.password
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || t('register_error') || 'Error creating account');
            console.error('Register error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">CINEMATIC</h1>
                <h2 className="login-subtitle">{t('register_title')}</h2>

                {error && (
                    <div className="alert alert-danger py-2" style={{ fontSize: '0.8rem' }} role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-secondary" style={{ fontSize: '0.8rem' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control bg-dark text-light border-secondary border-opacity-25 shadow-none"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="user@example.com"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-secondary" style={{ fontSize: '0.8rem' }}>
                            {t('password')}
                        </label>
                        <input
                            type="password"
                            className="form-control bg-dark text-light border-secondary border-opacity-25 shadow-none"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label text-secondary" style={{ fontSize: '0.8rem' }}>
                            {t('confirm_password')}
                        </label>
                        <input
                            type="password"
                            className="form-control bg-dark text-light border-secondary border-opacity-25 shadow-none"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100 fw-bold mt-2 shadow-none"
                        disabled={loading}
                    >
                        {loading ? '...' : t('register_btn')}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                        {t('already_have_account')}{' '}
                        <Link to="/login" className="text-success text-decoration-none fw-bold">
                            {t('login_here')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
