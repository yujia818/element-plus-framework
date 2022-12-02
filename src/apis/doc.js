import call from './call';


export const get_user_docs = ({ userId }) => {
    return call.get(`/user/${userId}/docs`);
}