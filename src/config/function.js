import Cookies from "cookies-js";

export const isLogin = () => {
    return !!Cookies.get('data') && !!Cookies.get('token')
}