// src/components/Auth.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser, registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || '/checkout';

  const getFriendlyErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este correo ya está registrado. Intenta iniciar sesión.';
      case 'auth/invalid-email':
        return 'El formato de correo no es válido.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Credenciales inválidas. Revisa tu correo y contraseña.';
      default:
        return 'Ocurrió un error al procesar la autenticación.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);
      if (isRegistering) {
        await registerUser(email.trim(), password);
      } else {
        await loginUser(email.trim(), password);
      }
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '3rem auto', padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', color: '#1d3557', marginBottom: '1.5rem' }}>
        {isRegistering ? 'Crear cuenta en Misan' : 'Iniciar Sesión'}
      </h2>

      {error && (
        <p style={{ color: '#e63946', background: '#ffebee', padding: '0.75rem', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Correo electrónico:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Contraseña:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.75rem', background: '#1d3557', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}
        >
          {loading ? 'Procesando...' : isRegistering ? 'Registrarme' : 'Ingresar'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
        <span>{isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta?'}</span>{' '}
        <button
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
          style={{ background: 'none', border: 'none', color: '#e63946', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isRegistering ? 'Inicia sesión aquí' : 'Crea una aquí'}
        </button>
      </div>
    </div>
  );
}

export default Auth;