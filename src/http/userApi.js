import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";


// шифруем пароль через jwt и сохраняем хэш
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

// В бд лежит шифрованый токен, его мы достаем и расшифровываем

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

