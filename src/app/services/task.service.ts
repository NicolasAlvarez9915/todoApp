import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ITask } from '../models/interfaces/Itask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _storage: Storage | null = null;
  private tasksKey = 'tasks';
  private tasks: ITask[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const storedTasks = await this._storage.get(this.tasksKey);
    this.tasks = storedTasks || [];
  }

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  async addTask(title: string, categoryId: number) {
    const newTask: ITask = {
      id: Date.now(),
      title,
      completed: false,
      categoryId: categoryId
    };
    this.tasks.push(newTask);
    await this._storage?.set(this.tasksKey, this.tasks);
    return newTask
  }

  async toggleCompleted(id: number) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index > -1) {
      this.tasks[index].completed = !this.tasks[index].completed;
      await this._storage?.set(this.tasksKey, this.tasks);
    }
  }

  async deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    await this._storage?.set(this.tasksKey, this.tasks);
  }
}
