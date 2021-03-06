import {RegistrationAPI} from '../../API/loginAPI';
import {entityStatusAC, entityStatusAT} from './reducerLogin';
import {Dispatch} from 'redux';

const initState: InitStateType = {
    authoriseMe: false,
    entityStatus: false
}

export const reducerRegistration = (state: any = initState, action: actionType) => {
    switch (action.type) {
        case 'REGISTRATION_ME':
            return {...state, authoriseMe: action.authoriseMe}
        case "ENTITY-STATUS":
            return {...state, entityStatus: true}
        default:
            return state
    }
}

export const registrationAC = (authoriseMe: boolean) => ({
    type: 'REGISTRATION_ME',
    authoriseMe
} as const)

export const registrationTC = (email: string, password: string,) => async (dispatch: ThunkDispatch) => {
    dispatch(entityStatusAC())
    try {
        await RegistrationAPI.regMe(email, password)
        dispatch(registrationAC(true))
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        alert(error)
    }
    dispatch(registrationAC(false))
}

// types

type  InitStateType = {
    authoriseMe: boolean,
    entityStatus: boolean
}
type actionType = registrationAT | entityStatusAT
type registrationAT = ReturnType<typeof registrationAC>
type ThunkDispatch = Dispatch<actionType>