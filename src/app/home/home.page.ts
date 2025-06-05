import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/interfaces/Itask';
import { ICategory } from '../models/interfaces/ICategory';
import { ModalController } from '@ionic/angular';
import { CategoryModalComponent } from './modals/category-modal/category-modal.component';
import { CategoryServiceService } from '../services/category-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tasks: ITask[] = [];
  newTaskTitle: string = '';
  categoryId?: number;
  categories: ICategory[] = [];

  constructor(
    private modalCtrl: ModalController,
    private taskService: TaskService,
    private categoryService: CategoryServiceService) { }

  async ngOnInit() {
    await this.taskService.init();
    this.loadTasks();
  }

  async openCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: { mode: 'create' },
    });

    modal.onDidDismiss().then(() => this.loadCategories());
    await modal.present();
  }

  async editCategory(category: ICategory) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: { mode: 'edit', category },
    });

    modal.onDidDismiss().then(() => this.loadCategories());
    await modal.present();
  }

  async deleteCategory(id: number) {
    await this.categoryService.deleteCategory(id);
    this.loadCategories();
  }

  loadTasks() {
    this.tasks = this.taskService.getAllTasks();
  }

  ionViewWillEnter() {
    this.loadCategories();
  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  async addTask() {
    if (this.newTaskTitle.trim().length === 0) return;
    await this.taskService.addTask(this.newTaskTitle.trim(), this.categoryId!);
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

  getCategoryName(categoryId?: number) {
    return this.categories.find(c => c.id === categoryId)?.name || 'Sin categoría';
  }

}
