import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._marks = [];
    this._categories = []; 
    this._products = []; 

    this._selectedCategory = {}; 
    this._selectedMark = {}; 

    makeAutoObservable(this);
  }


  setMarks(marks) {
    this._marks = marks;
  }

  setCategories(categories) {
    this._categories = categories;
  }

  setProducts(products) {
    this._products = products;
  }

  setSelectedMark(mark) {
    this._selectedMark = mark;
  }

  setSelectedCategory(category) {
    this._selectedCategory = category;
        if (category.id) {
            this.setProducts(this._products.filter(product => product.categoryId === category.id));
        } else {
            this.setProducts(this._products);
        }
  }

  // Геттер для получения массива марок
  get marks() {
    return this._marks;
  }

  // Геттер для получения массива категорий
  get categories() {
    return this._categories;
  }

  // Геттер для получения массива продуктов
  get products() {
    return this._products;
  }

  // Геттер для получения выбранной марки
  get selectedMark() {
    return this._selectedMark;
  }

  // Геттер для получения выбранной категории
  get selectedCategory() {
    return this._selectedCategory;
  }
}
