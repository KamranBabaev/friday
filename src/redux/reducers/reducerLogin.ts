import {LoginAPI} from "../../API/loginAPI";

const initState = {
  authMe: false
}

export const reducerLogin = (state: any = initState, action: actionType) => {
  switch (action.type) {
    case "LOGIN_AUTH_ME":
      return {...state, authMe: action.authMe}
    default:
      return state
  }
}

export const loginAC = (authMe: boolean) => ({
  type: "LOGIN_AUTH_ME",
  authMe
} as const)

export const loginTC = (email: string, password: string, checked: boolean) => (dispatch: any) => {
  const response = LoginAPI.authMe(email, password, checked)
      .then(() => dispatch(loginAC(true)))
      .catch(() => dispatch(loginAC(false)))

}

// types
type actionType = loginAT
type loginAT = ReturnType<typeof loginAC>