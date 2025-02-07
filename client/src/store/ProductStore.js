import { makeAutoObservable } from "mobx";
import { fetchProducts } from "../http/productApi";

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
    this.fetchProducts();
  }

  fetchProducts() {
    fetchProducts(this.selectedCategory.id || null).then((data) => {
      this.setProducts(data.rows);
    });
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
}
