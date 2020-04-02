import axios from 'axios';

class BaseService {
    constructor(props) {
        const service = axios.create({
            headers: {}
        });
        service.interceptors.response.use(this.onSuccess, this.onError);
        this.service = service;
    }

    setHeader(key, value) {
        this.service.defaults.headers.common[key] = value;
    }

    removeHeader(key) {
        delete this.service.defaults.headers.common[key];
    }

    onSuccess(response) {
        return response;
    }

    redirectTo = (document, path) => {
        document.location = path;
    };

    onError = error => {
        switch (error.response.status) {
            case 401:
                return Promise.reject(error.response)
            default:
                return Promise.reject(error.response);
        }
    }

    get(endpoint) {
        return this.service.get(endpoint);
    }

    post(endpoint, payload) {
        return this.service.request({
            method: 'POST',
            url: endpoint,
            responseType: 'json',
            data: payload
        });
    }

    put(endpoint, payload) {
        return this.service.request({
            method: 'PUT',
            url: endpoint,
            responseType: 'json',
            data: payload
        });
    }

    delete(endpoint) {
        return this.service.request({
            method: 'DELETE',
            url: endpoint,
            responseType: 'json',
        });
    }
    
}

export default BaseService;