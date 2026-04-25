import { NotFoundException } from '@nestjs/common';
import { TasksService } from '../src/tasks/tasks.service';

describe('TasksService (unit)', () => {
  let service: TasksService;

  beforeEach(() => {
    service = new TasksService();
  });

  it('creates and returns a pending task', () => {
    const created = service.create({ title: 'Unit task', description: 'details' });

    expect(created).toEqual({
      id: 1,
      title: 'Unit task',
      description: 'details',
      status: 'pending',
    });
  });

  it('returns all tasks', () => {
    service.create({ title: 'Task 1', description: 'd1' });
    service.create({ title: 'Task 2', description: 'd2' });

    expect(service.findAll()).toHaveLength(2);
  });

  it('updates an existing task status', () => {
    const created = service.create({ title: 'Task 1', description: 'd1' });

    const updated = service.update(created.id, { status: 'done' });

    expect(updated.status).toBe('done');
  });

  it('throws when updating missing task', () => {
    expect(() => service.update(999, { status: 'done' })).toThrow(NotFoundException);
  });

  it('deletes an existing task', () => {
    const created = service.create({ title: 'Task 1', description: 'd1' });

    const result = service.remove(created.id);

    expect(result).toEqual({ message: 'Task deleted' });
    expect(service.findAll()).toHaveLength(0);
  });

  it('throws when deleting missing task', () => {
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });
});
