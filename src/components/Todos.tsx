import { Button, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
                return state.filter(({ id }) => id !== action.id);
            default:
                return state
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
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <Box>
                    <Box>
                        <Typography sx={{ textAlign: 'center', pb: 3 }} variant='h5'>Todo App</Typography>
                        <Paper
                            component="form"
                            sx={{ display: 'flex', alignItems: 'center', width: 460 }}
                        >
                            <input style={{ width: '400px', padding: '15px 20px', border: 'none', outline: 'none', fontSize: '20px' }} type="text" ref={newTodoRef} />
                            <IconButton
                                onClick={onAddTodo}
                                sx={{
                                    background: '#4383e6',
                                    color: 'white',
                                    fontSize: '16px',
                                    padding: '18px 26px',
                                    borderRadius: 0,

                                    '&:hover': {
                                        background: '#4383e6',
                                        color: 'white',
                                    }
                                }}
                                aria-label="directions">
                                Add
                            </IconButton>
                        </Paper>
                    </Box>
                    <Box sx={{ pt: 5 }}>
                        {
                            todos.map(todo => <Box
                                key={todo.id}
                                sx={{
                                    border: '1px solid #c2c4c9',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    pl: '10px',
                                    mb: 1
                                }}
                            >
                                <Typography sx={{ fontSize: '20px' }}>{todo.text}</Typography>
                                <button
                                    onClick={() => dispatch({ type: 'REMOVE', id: todo.id })}
                                    style={{ background: '#eaf1f3', border: 'none', padding: '10px 20px', }}
                                >
                                    <HighlightOffIcon style={{ fontSize: '30px', color: '#a75353' }} />
                                </button>
                            </Box>)
                        }
                    </Box>
                </Box>
            </Box>
        </>
    );
}


export default Todos;