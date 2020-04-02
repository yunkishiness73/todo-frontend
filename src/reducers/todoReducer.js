import {
    FETCH_TODO_LIST
} from '../constants/constants';

const initialState = {
}

const fetchTodoList = (state, action) => {
    return {
        ...state,
        todos: action.todos
    }
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODO_LIST:
            return fetchTodoList(state, action);
        
        default:
            return state;
    }
}

export default rootReducer;