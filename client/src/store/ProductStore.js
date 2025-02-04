import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._marks = [];
    this._categories = [];
    this._products = [];

    this._selectedCategory = {};
    this._selectedMark = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
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
    this.setPage(1);
    this._selectedMark = mark;
  }
  setSelectedCategory(category) {
    this.setPage(1);
    this._selectedCategory = category;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  get marks() {
    return this._marks;
  }
  get categories() {
    return this._categories;
  }
  get products() {
    return this._products;
  }
  get selectedMark() {
    return this._selectedMark;
  }
  get selectedCategory() {
    return this._selectedCategory;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}
