import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useLanguage } from '../contexts/languageContext';
import '../styles/login.css';

/**
 * Login Page
 * Handles user authentication.
 */
const Login = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        setLoading(true);
        setError('');

        try {
            const response = await authAPI.login(formData);
            const data = response.data || response;

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            navigate('/media');
        } catch (err) {
            setError(err.response?.data?.msg || t('login_error') || 'Error signing in');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">CINEMATIC</h1>
                <h2 className="login-subtitle">{t('sign_in')}</h2>

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

                    <button
                        type="submit"
                        className="btn btn-success w-100 fw-bold mt-2 shadow-none"
                        disabled={loading}
                    >
                        {loading ? '...' : t('sign_in_btn')}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                        {t('no_account')}{' '}
                        <Link to="/register" className="text-success text-decoration-none fw-bold">
                            {t('register_here')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
