import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser, registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || '/';

  const mapFirebaseError = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos.';
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya se encuentra registrado.';
      case 'auth/weak-password':
        return 'La contraseña debe contener al menos 6 caracteres.';
      case 'auth/invalid-email':
        return 'El formato de correo ingresado no es válido.';
      default:
        return 'Ocurrió un error al procesar la solicitud. Intenta nuevamente.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);

    try {
      if (isRegistering) {
        await registerUser(email.trim(), password);
      } else {
        await loginUser(email.trim(), password);
      }
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error('Error de autenticación:', err);
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>
        {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </h1>
      <p className={styles.subtitle}>
        {isRegistering
          ? 'Regístrate para comprar en Misan'
          : 'Ingresa a tu cuenta para continuar'}
      </p>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@misan.pe"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className={styles.btnSubmit}>
          {loading ? 'Procesando...' : isRegistering ? 'Registrarme' : 'Entrar'}
        </button>
      </form>

      <div className={styles.toggleWrapper}>
        <span>
          {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta?'}
        </span>
        <button
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
          className={styles.btnToggle}
        >
          {isRegistering ? 'Inicia sesión' : 'Regístrate aquí'}
        </button>
      </div>
    </div>
  );
}

export default Auth;