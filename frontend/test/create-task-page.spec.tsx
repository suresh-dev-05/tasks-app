import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CreateTaskPage from '../app/create-task/page';

const mockApiFetch = vi.fn();

vi.mock('../lib/api', () => ({
  apiFetch: (...args: unknown[]) => mockApiFetch(...args),
}));

describe('CreateTaskPage', () => {
  beforeEach(() => {
    mockApiFetch.mockReset();
  });

  it('creates a task and shows success message', async () => {
    mockApiFetch.mockResolvedValueOnce({ id: 1, title: 'Task' });

    render(<CreateTaskPage />);

    fireEvent.change(screen.getByPlaceholderText('Task title'), { target: { value: 'Ship feature' } });
    fireEvent.change(screen.getByPlaceholderText('Task description'), {
      target: { value: 'Deploy with confidence' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create Task' }));

    await waitFor(() => {
      expect(mockApiFetch).toHaveBeenCalledWith('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title: 'Ship feature', description: 'Deploy with confidence' }),
      });
    });

    expect(await screen.findByText('Task created successfully')).toBeInTheDocument();
  });
});
