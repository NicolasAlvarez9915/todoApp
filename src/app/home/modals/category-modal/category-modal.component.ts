import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ICategory } from 'src/app/models/interfaces/ICategory';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  standalone: false
})
export class CategoryModalComponent implements OnInit {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() category?: ICategory;

  name: string = '';
  color: string = '#000000'; // color por defecto

  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryServiceService
  ) { }

  ngOnInit() {
    if (this.mode === 'edit' && this.category) {
      this.name = this.category.name;
      this.color = this.category.color || '#000000';
    }
  }

  async save() {
    if (!this.name.trim()) return;

    const newCategory: ICategory = {
      id: this.category?.id ?? Date.now(),
      name: this.name.trim(),
      color: this.color,
    };

    if (this.mode === 'edit') {
      await this.categoryService.updateCategory(newCategory);
    } else {
      await this.categoryService.addCategory(newCategory);
    }

    this.modalCtrl.dismiss(true);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}

