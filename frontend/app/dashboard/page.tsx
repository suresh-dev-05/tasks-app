'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { CheckIcon, ClockIcon, RefreshIcon } from '../../components/icons';

type Task = {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'done';
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setError('');
      const data = await apiFetch<Task[]>('/tasks');
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    }
  };

  const toggleStatus = async (task: Task) => {
    try {
      await apiFetch<Task>(`/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: task.status === 'pending' ? 'done' : 'pending',
        }),
      });
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  useEffect(() => {
    void loadTasks();
  }, []);

  return (
    <section>
      <h2 className="page-title">Dashboard</h2>
      <p className="page-subtitle">View and update task statuses in real time.</p>

      <div className="button-row">
        <button className="btn-secondary" type="button" onClick={() => void loadTasks()}>
          <RefreshIcon className="icon" />
          Refresh
        </button>
      </div>

      {error && <p className="status error">{error}</p>}

      <ul className="task-list">
        {tasks.map((task) => {
          const isDone = task.status === 'done';

          return (
            <li key={task.id} className="task-item">
              <div className="task-top">
                <h3 className="task-title">{task.title}</h3>
                <span className={`badge ${isDone ? 'done' : 'pending'}`}>
                  {isDone ? <CheckIcon className="small-icon" /> : <ClockIcon className="small-icon" />}
                  {task.status}
                </span>
              </div>
              <p className="muted">{task.description || 'No description'}</p>
              <div>
                <button className="btn-primary" type="button" onClick={() => void toggleStatus(task)}>
                  Mark as {isDone ? 'Pending' : 'Done'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {tasks.length === 0 && !error && <p className="muted">No tasks yet. Create one from the Create Task page.</p>}
    </section>
  );
}
