import type { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

interface IAuthContext {
    auth: boolean
    setAuth: Dispatch<SetStateAction<boolean>>
}

export const authContext = createContext<IAuthContext>({ auth: false, setAuth: () => null });
