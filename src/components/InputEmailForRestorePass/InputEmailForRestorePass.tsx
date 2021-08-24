import {SuperButton} from "../common/c2-SuperButton/SuperButton";
import stylesContainer from "../common/styles/Container.module.css";
import {NavLink, Redirect} from "react-router-dom";
import styles from "./InputEmailForRestorePass.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import React, {ChangeEvent, useState} from "react";
import {sendEmailForUpdatePasswordTC} from "../../redux/reducers/reducerRestorePassword";


export const InputEmailForRestorePass = () => {

  const dispatch = useDispatch()
  const sendEmail = useSelector<AppRootStateType, boolean>(state => state.restore.sendEmail)
  const [email, setEmail] = useState('')

  const from = "test-front-admin <ai73a@yandex.by>"
  const message = `<div style="background-color: lime; padding: 15px">
                     password recovery link: <a href='http://localhost:3000/#/restorpassword/$token$'>link</a>
                     </div>`

  const emailTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const sendInstructionHandler = () => {
    dispatch(sendEmailForUpdatePasswordTC(email, from, message))
    setEmail("")
  }

  if (sendEmail) {
    return <Redirect to={"/checkemail"}/>
  }

  return (
      <div className={stylesContainer.container}>

        <div className={stylesContainer.titleApp}>
          <h1>Brain storm</h1>
          <h3>Forgot your password?</h3>
        </div>
        <form className={stylesContainer.form}>
          <div className={stylesContainer.item}>
            <p>Email:</p>
            <div className={stylesContainer.inputBlock}>
              <input onChange={emailTarget} value={email} type="text"
                     placeholder="example@ddd.com"/>
            </div>
          </div>
          <div className={styles.restoreBlock}>
            <p>Enter your email address and we will send you further
              instruction...</p>
            <SuperButton onClickHandler={sendInstructionHandler}
                         disabledBtn={false}
                         title="Send Instructions"
            />
            <p>Did you remember your password?</p>
            <div>
              <NavLink className={styles.navLink} to={'/login'}>
                Try logging in</NavLink>
            </div>
          </div>
        </form>
      </div>
  )
}