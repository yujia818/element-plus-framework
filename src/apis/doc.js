import call from './call';


export const get_user_docs = ({ userId }) => {
    return call.get(`/user/${userId}/docs`);
}

export const get_doc = ({ docId }) => {
    return call.get(`/docs/${docId}`);
}

export const save_doc = (docId, payload) => {
    return call.put(`/docs/${docId}`, payload);
}

export const add_user_doc = (payload) => {
    return call.post('/docs', payload);
}