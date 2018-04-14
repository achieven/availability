const baseDomain = 'http://localhost:8000/';

export const methods = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete'
};

export async function safeFetch (url, method, body) {
    let options = {
        method: method
    };
    if (methods.post === method) {
        options.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        options.body = body;
    }
    return (await fetch(baseDomain + url, options)).json();
}

