'use client';

import { FormEvent, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const result = await apiFetch<{ message: string }>(endpoint, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setMessage(result.message);
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    }
  };

  return (
    <section>
      <h2 className="page-title">{isRegister ? 'Create Account' : 'Login'}</h2>
      <p className="page-subtitle">Use your email and password to access tasks.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>

        <div className="button-row">
          <button className="btn-primary" type="submit">
            {isRegister ? 'Register' : 'Login'}
          </button>
          <button className="btn-secondary" type="button" onClick={() => setIsRegister((prev) => !prev)}>
            Switch to {isRegister ? 'Login' : 'Register'}
          </button>
        </div>
      </form>

      {message && <p className={`status ${isError ? 'error' : 'success'}`}>{message}</p>}
    </section>
  );
}
