import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import DashboardPage from '../app/dashboard/page';

const mockApiFetch = vi.fn();

vi.mock('../lib/api', () => ({
  apiFetch: (...args: unknown[]) => mockApiFetch(...args),
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    mockApiFetch.mockReset();
  });

  it('loads tasks and toggles status', async () => {
    mockApiFetch
      .mockResolvedValueOnce([
        { id: 2, title: 'Test dashboard', description: 'desc', status: 'pending' },
      ])
      .mockResolvedValueOnce({ id: 2, title: 'Test dashboard', description: 'desc', status: 'done' })
      .mockResolvedValueOnce([{ id: 2, title: 'Test dashboard', description: 'desc', status: 'done' }]);

    render(<DashboardPage />);

    expect(await screen.findByText('Test dashboard')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Mark as Done' }));

    await waitFor(() => {
      expect(mockApiFetch).toHaveBeenCalledWith('/tasks/2', {
        method: 'PUT',
        body: JSON.stringify({ status: 'done' }),
      });
    });

    expect(await screen.findByText('done')).toBeInTheDocument();
  });
});
