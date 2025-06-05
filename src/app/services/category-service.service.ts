import { Injectable } from '@angular/core';
import { ICategory } from '../models/interfaces/ICategory';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private categories: ICategory[] = [];
  private storageReady = this.storage.create();

  constructor(private storage: Storage) { }

  async load(): Promise<void> {
    await this.storageReady;
    this.categories = (await this.storage.get('categories')) || [];
  }

  async getCategories(): Promise<ICategory[]> {
    await this.load();
    return this.categories;
  }

  async saveCategories(): Promise<void> {
    await this.storage.set('categories', this.categories);
  }

  async addCategory(category: ICategory): Promise<void> {
    category.id = Date.now();
    this.categories.push(category);
    await this.saveCategories();
  }

  async updateCategory(updated: ICategory): Promise<void> {
    const index = this.categories.findIndex(c => c.id === updated.id);
    if (index > -1) {
      this.categories[index] = updated;
      await this.saveCategories();
    }
  }

  async deleteCategory(id: number): Promise<void> {
    this.categories = this.categories.filter(c => c.id !== id);
    await this.saveCategories();
  }
}
