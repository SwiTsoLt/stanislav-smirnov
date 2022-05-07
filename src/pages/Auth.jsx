import React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/auth.hook";
import classes from '../styles/pages/Auth.module.css'
import { useNavigate } from 'react-router-dom'
import { Loader } from "../elements/Loader";
import { useLang } from '../hooks/lang.hook'
import { useUser } from "../hooks/user.hook";

export const Auth = ({ asideProps, setAsideProps }) => {

    const navigate = useNavigate();
    const { ready, setReady } = useUser()
    const { lang, langList } = useLang()
    const { registration, login } = useAuth()

    const [authMethod, setAuthMethod] = useState('login')
    const [formLogin, setFormLogin] = useState({ username: "", password: "" })
    const [formRegistration, setFormRegistration] = useState({ username: "", password: "", confirmPassword: "" })

    const registrationHandler = async () => {
        setReady(false)
        const response = await registration(formRegistration.username, formRegistration.password, formRegistration.confirmPassword)
        if (response) {
            const data = await login(formRegistration.username, formRegistration.password)
            if (data) {
                setAsideProps({ ...asideProps, isAuth: true })
                setReady(true)
                navigate(asideProps.page)
            }
        }
    }

    const loginHandler = async () => {
        setReady(false)
        const response = await login(formLogin.username, formLogin.password)
        setAsideProps({
            ...asideProps,
            isAuth: !!response?.userInfo?.userId || false,
            roles: response?.userInfo?.userRoles || ["USER"]
        })
        response && navigate(asideProps.page)
        setReady(true)
    }

    const setAuthMethodHandler = method => {
        setAuthMethod(method)
    }

    if (!ready) {
        return <Loader />
    }

    return (
        <div className={`borderRadius ${classes.authPage}`}>
            <h1>{langList.pages.auth.authMethod[authMethod]['title'][lang]}</h1>
            {authMethod === 'login'
                ? <div className={classes.auth_login_form}>
                    <input
                        onChange={e => setFormLogin({ ...formLogin, username: e.target.value })}
                        value={formLogin.username}
                        type="text"
                        name="name"
                        placeholder={langList.pages.auth.authMethod.login.inputPlaceHolder.name[lang]}
                    />
                    <input
                        onChange={e => setFormLogin({ ...formLogin, password: e.target.value })}
                        value={formLogin.password}
                        type="password"
                        name="password"
                        placeholder={langList.pages.auth.authMethod.login.inputPlaceHolder.password[lang]}
                    />
                    <button onClick={loginHandler}>{langList.pages.auth.button[lang]}</button>
                </div>

                : <div className={classes.auth_registration_form}>
                    <input
                        onChange={e => setFormRegistration({ ...formRegistration, username: e.target.value })}
                        value={formRegistration.username}
                        type="text"
                        name="name"
                        placeholder={langList.pages.auth.authMethod.registration.inputPlaceHolder.name[lang]}
                    />
                    <input
                        onChange={e => setFormRegistration({ ...formRegistration, password: e.target.value })}
                        value={formRegistration.password}
                        type="password"
                        name="password"
                        placeholder={langList.pages.auth.authMethod.registration.inputPlaceHolder.password[lang]}
                    />
                    <input
                        onChange={e => setFormRegistration({ ...formRegistration, confirmPassword: e.target.value })}
                        value={formRegistration.confirmPassword}
                        type="password"
                        name="confirmPassword"
                        placeholder={langList.pages.auth.authMethod.registration.inputPlaceHolder.confirmPassword[lang]}
                    />
                    <button onClick={registrationHandler}>{langList.pages.auth.button[lang]}</button>
                </div>
            }
            <div className={classes.auth_method}>
                {
                    authMethod === 'login'
                        ? <button
                            className="auth_method_registration"
                            onClick={(e) => setAuthMethodHandler('registration', e.target)}
                        >
                            {langList.pages.auth.authMethod.registration.title[lang]}
                        </button>
                        : <button
                            className="auth_method_login"
                            onClick={(e) => setAuthMethodHandler('login', e.target)}
                        >
                            {langList.pages.auth.authMethod.login.title[lang]}
                        </button>
                }
            </div>
        </div>
    )
}