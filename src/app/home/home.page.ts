import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/interfaces/Itask';
import { ICategory } from '../models/interfaces/ICategory';
import { ModalController } from '@ionic/angular';
import { CategoryModalComponent } from './modals/category-modal/category-modal.component';
import { CategoryServiceService } from '../services/category-service.service';
import { FeatureFlagService } from '../services/feature-flag.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  noMoreTasks = false;
  tasks: ITask[] = [];
  newTaskTitle: string = '';
  categoryId?: number;
  categories: ICategory[] = [];
  filterCategoryId: number | null = null;
  showFeature = false;

  displayedTasks: ITask[] = [];
  pageSize = 10;
  currentPage = 0;
  loading = false;

  constructor(
    private featureFlagService: FeatureFlagService,
    private modalCtrl: ModalController,
    private taskService: TaskService,
    private categoryService: CategoryServiceService
  ) { }

  async ngOnInit() {
    this.showFeature = await this.featureFlagService.isFeatureEnabled();
    await this.taskService.init();
    await this.loadCategories();
    this.loadTasks(true);
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
    await this.loadCategories();
    this.loadTasks(true);
  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  get filteredTasks(): ITask[] {
    if (!this.filterCategoryId) {
      return this.tasks;
    }
    return this.tasks.filter(task => task.categoryId === this.filterCategoryId);
  }

  loadTasks(reset: boolean = false) {
    if (reset) {
      this.currentPage = 0;
      this.displayedTasks = [];
      this.tasks = this.taskService.getAllTasks();
    }
    const allTasks = this.filteredTasks;
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const nextTasks = allTasks.slice(start, end);
    this.displayedTasks = [...this.displayedTasks, ...nextTasks];
    this.currentPage++;
  }

  async loadMoreTasks(event: any) {
    const allTasks = this.filteredTasks;
    const start = this.currentPage * this.pageSize;
    if (start >= allTasks.length) {
      this.noMoreTasks = true;
    } else {
      this.noMoreTasks = false;
      this.loadTasks(false);
    }
    event.target.complete();
  }

  updateDisplayedTasks() {
    const allTasks = this.filteredTasks;
    const start = 0;
    const end = this.currentPage * this.pageSize;
    this.displayedTasks = allTasks.slice(start, end);
  }

  async addTask() {
    if (this.newTaskTitle.trim().length === 0) return;
    const newTask = await this.taskService.addTask(this.newTaskTitle.trim(), this.categoryId!);
    this.newTaskTitle = '';
    this.tasks.push(newTask);
    this.noMoreTasks = false;
    if (!this.filterCategoryId || this.filterCategoryId === newTask.categoryId) {
      if (this.displayedTasks.length < (this.currentPage * this.pageSize)) {
        this.displayedTasks.push(newTask);
      }
    }
  }

  async toggleCompleted(id: number) {
    await this.taskService.toggleCompleted(id);
    this.tasks = this.taskService.getAllTasks();
    this.loadTasks(true);
  }
  async deleteTask(id: number) {
    await this.taskService.deleteTask(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.displayedTasks = this.displayedTasks.filter(task => task.id !== id);
    const allFilteredTasks = this.filteredTasks;
    const expectedDisplayedCount = this.currentPage * this.pageSize;
    if (this.displayedTasks.length < expectedDisplayedCount) {
      const start = this.displayedTasks.length;
      const nextTasks = allFilteredTasks.slice(start, expectedDisplayedCount);
      this.displayedTasks = [...this.displayedTasks, ...nextTasks];
    }
  }

  getCategoryName(categoryId?: number) {
    return this.categories.find(c => c.id === categoryId)?.name || 'Sin categoría';
  }
}
