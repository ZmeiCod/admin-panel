import { makeAutoObservable } from "mobx";
import { fetchProducts } from "../http/productApi";

export default class ProductStore {
  constructor() {
    this._categories = [];
    this._products = [];

    this._selectedCategory = {};

    makeAutoObservable(this);
  }

  setCategories(categories) {
    this._categories = categories;
  }

  setProducts(products) {
    this._products = products;
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

  get categories() {
    return this._categories;
  }

  get products() {
    return this._products;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }
}
