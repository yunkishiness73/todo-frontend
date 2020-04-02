import BaseService from './BaseService';
import * as AppConstant from '../constants/constants';
import qs from 'querystring';
import axios from 'axios';


class TodoService extends BaseService {
    constructor(props) {
        super(props);
        this.requestURL = AppConstant.API_URL;
    }

    getAll() {
        return this.get(this.requestURL);
    }
    
    create(task) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `${this.requestURL}`,
                data: qs.stringify({
                    task,
                    isCompleted: false
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function (res) {
                   resolve(res);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }

    update(id, isCompleted) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: `${this.requestURL}/${id}`,
                data: qs.stringify({
                    isCompleted
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function (res) {
                   resolve(res);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }

    delete(id) {
        let endpoint = '';

        if (id) {
            endpoint = `${this.requestURL}/${id}`;
        }

        return this.delete(endpoint);
    }

   
}

export default new TodoService();