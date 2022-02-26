import { createContext, useReducer, useEffect } from 'react';
import Reducer from './Reducer'
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null
}

export const Context = createContext(INITIAL_STATE);

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <Context.Provider value={{
            user: state.user,
            dispatch
        }
        }>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider