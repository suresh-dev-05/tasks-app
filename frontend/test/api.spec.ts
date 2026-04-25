import { describe, expect, it, vi } from 'vitest';
import { apiFetch } from '../lib/api';

describe('apiFetch', () => {
  it('returns parsed JSON when response is ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ hello: 'world' }),
    });

    vi.stubGlobal('fetch', fetchMock);

    const result = await apiFetch<{ hello: string }>('/health');

    expect(result).toEqual({ hello: 'world' });
    expect(fetchMock).toHaveBeenCalled();
  });

  it('throws when response is not ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'Bad request',
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(apiFetch('/health')).rejects.toThrow('Bad request');
  });
});
