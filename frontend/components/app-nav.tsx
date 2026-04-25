'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreateTaskIcon, DashboardIcon, HomeIcon, LoginIcon } from './icons';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/login', label: 'Login', icon: LoginIcon },
  { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { href: '/create-task', label: 'Create Task', icon: CreateTaskIcon },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="top-nav" aria-label="Main navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link key={item.href} href={item.href} className={`nav-link${isActive ? ' active' : ''}`}>
            <Icon className="icon" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
