import {makeAutoObservable} from "mobx";

// Класс UserStore используется для управления состоянием пользователя.
export default class UserStore {
    constructor() {
        // Изначально пользователь не авторизован
        this._isAuth = false;
        // Изначально объект пользователя пуст
        this._user = {};
        // Автоматическое отслеживание изменений в состоянии класса с помощью MobX
        makeAutoObservable(this);
    }

    // Метод для установки состояния авторизации
    setIsAuth(bool) {
        this._isAuth = bool; // Обновление значения _isAuth
    }

    // Метод для установки информации о пользователе
    setUser(user) {
        this._user = user; // Обновление объекта _user
    }

    // Геттер для получения состояния авторизации
    get isAuth() {
        return this._isAuth; // Возвращает текущее значение _isAuth
    }

    // Геттер для получения информации о пользователе
    get user() {
        return this._user; // Возвращает текущий объект _user
    }
}
