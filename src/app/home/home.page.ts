import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/interfaces/Itask';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tasks: ITask[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) { }

  async ngOnInit() {
    // Pequeña espera para inicializar storage
    await this.taskService.init();
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getAllTasks();
  }

  async addTask() {
    if (this.newTaskTitle.trim().length === 0) return;
    await this.taskService.addTask(this.newTaskTitle.trim());
    this.newTaskTitle = '';
    this.loadTasks();
  }

  async toggleCompleted(id: number) {
    await this.taskService.toggleCompleted(id);
    this.loadTasks();
  }

  async deleteTask(id: number) {
    await this.taskService.deleteTask(id);
    this.loadTasks();
  }

}
