import Link from 'next/link';
import { CreateTaskIcon, DashboardIcon, LoginIcon } from '../components/icons';

export default function HomePage() {
  return (
    <section>
      <h2 className="page-title">Welcome</h2>
      <p className="page-subtitle">Manage your tasks with a clean API-driven workflow.</p>

      <div className="info-grid">
        <article className="info-card">
          <h3>Quick Start</h3>
          <p className="muted">Register or login first, then create and update tasks from dashboard.</p>
          <div className="button-row">
            <Link className="nav-link" href="/login">
              <LoginIcon className="icon" />
              Open Login
            </Link>
            <Link className="nav-link" href="/dashboard">
              <DashboardIcon className="icon" />
              Open Dashboard
            </Link>
            <Link className="nav-link" href="/create-task">
              <CreateTaskIcon className="icon" />
              Create Task
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
