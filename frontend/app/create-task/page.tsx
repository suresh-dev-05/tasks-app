'use client';

import { FormEvent, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function CreateTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      await apiFetch('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      });

      setTitle('');
      setDescription('');
      setMessage('Task created successfully');
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Failed to create task');
    }
  };

  return (
    <section>
      <h2 className="page-title">Create Task</h2>
      <p className="page-subtitle">Add a title and optional details.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="button-row">
          <button className="btn-primary" type="submit">
            Create Task
          </button>
          <button
            className="btn-secondary"
            type="button"
            onClick={() => {
              setTitle('');
              setDescription('');
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {message && <p className={`status ${isError ? 'error' : 'success'}`}>{message}</p>}
    </section>
  );
}
