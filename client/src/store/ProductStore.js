import { makeAutoObservable } from "mobx"; // Импортируем функцию makeAutoObservable из MobX

// Определяем класс ProductStore для управления состоянием продукта
export default class ProductStore {
  constructor() {
    // Инициализируем массивы для характеристик товара
    this._marks = []; // Массив марок
    this._categories = []; // Массив категорий
    this._products = []; // Массив продуктов

    // Инициализируем выбранные марку и категорию как пустые объекты
    this._selectedCategory = {}; 
    this._selectedMark = {}; 

    // Делаем все поля класса наблюдаемыми (reactive)
    makeAutoObservable(this);
  }

  // Метод для установки массива марок
  setMarks(marks) {
    this._marks = marks;
  }

  // Метод для установки массива категорий
  setCategories(categories) {
    this._categories = categories;
  }

  // Метод для установки массива продуктов
  setProducts(products) {
    this._products = products;
  }

  // Метод для установки выбранной марки
  setSelectedMark(mark) {
    this._selectedMark = mark;
  }

  // Метод для установки выбранной категории
  setSelectedCategory(category) {
    this._selectedCategory = category;
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
