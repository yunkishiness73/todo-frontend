import { StatusCode,
    FETCH_TODO_LIST
} from '../constants/constants';
import TodoService from '../services/TodoService';


export const fetchTodoListSuccess = (todos) => {
    return {
        type: FETCH_TODO_LIST,
        todos
    }
}

export const fetchTodoList = () => {
    return dispatch => {
        TodoService.getAll()
            .then(res => {
                if (res.status == StatusCode.SUCCESS || res.status == StatusCode.NO_CONTENT) {
                    dispatch(fetchTodoListSuccess(res.data));
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const updateTodo = (todo) => {
    const { id, isCompleted } = todo;

    return dispatch => {
        TodoService.update(id, isCompleted)
                    .then(res => {
                        if (res.status == StatusCode.SUCCESS || res.status == StatusCode.NO_CONTENT) {
                            return TodoService.getAll();
                        }
                    })
                    .then(res2 => {
                        if (res2.status == StatusCode.SUCCESS || res2.status == StatusCode.NO_CONTENT) {
                            dispatch(fetchTodoListSuccess(res2.data));
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
    }
}