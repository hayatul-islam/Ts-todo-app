import React, { useCallback, useEffect, useReducer, useRef } from 'react';

interface Todo {
    id: number,
    text: string
}
type ActionType = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number }
const initialTodo: Todo[] = JSON.parse(localStorage.getItem('todos') || '');

const Todos = () => {
    const reducer = (state: Todo[] = initialTodo, action: ActionType) => {
        switch (action.type) {
            case "ADD":
                return [
                    ...state,
                    {
                        id: state.length,
                        text: action.text
                    }
                ]
            case "REMOVE":
                return state.filter(({ id }) => id !== action.id)
        }
    }
    const [todos, dispatch] = useReducer(reducer, initialTodo);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const newTodoRef = useRef<HTMLInputElement>(null);
    const onAddTodo = useCallback(() => {
        if (newTodoRef.current) {
            dispatch({
                type: "ADD",
                text: newTodoRef?.current?.value
            })
            newTodoRef.current.value = "";
        }
    }, [])


    return (
        <div className="App">
            <input type="text" ref={newTodoRef} />
            <button onClick={onAddTodo}>add</button>
            {
                todos.map(todo => <div key={todo.id}>
                    {todo.text}
                    <button onClick={() => dispatch({ type: 'REMOVE', id: todo.id })}>Remove</button>
                </div>)
            }

        </div>
    );
}


export default Todos;