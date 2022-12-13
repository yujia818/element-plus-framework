import call from './call';


export const login = ({ username, password }) => {
    return call.post('/user/login', {
        userName: username,
        passWord: password
    });
}

export const regist = ({ username, password }) => {
    return call.post('/user/regist', {
        userName: username,
        passWord: password
    });
}