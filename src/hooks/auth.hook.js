import { useEffect } from "react"
import { useState } from "react"
import { useMessage } from "./message.hook"
import { useUser } from "./user.hook"

export const useAuth = () => {

    const message = useMessage()
    const { getUserInfo, setUserState} = useUser()
   
    const registration = async (formUserName, formUserPassword, formUserPasswordConfirm) => {
        if (formUserPassword === formUserPasswordConfirm) {
            const url = "api/auth/registration"
            const options = {
                "method": "post",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    userName: formUserName,
                    userPassword: formUserPassword,
                })
            }
            try {
                const response = await fetch(url, options)
                const data = await response.json()
                if (response.ok) {
                    message(data.message, true)
                    return true
                } else {
                    if (data.errors) {
                        let errorsMessage = ''
                        data.errors.forEach((error, index) => {
                            errorsMessage += `${index + 1}. ${error.msg}; `
                        })
                        message(errorsMessage, false)
                    } else {
                        message(data.message, true)
                    }
                    return false
                }
            } catch (e) {
                message(e, false)
                return false
            }
        } else {
            message('Password not validated, check entered data', false)
            return false
        }
    }

    const login = async (formUserName, formUserPassword) => {
        const url = "api/auth/login"
        const options = {
            "method": 'post',
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                userName: formUserName,
                userPassword: formUserPassword
            })
        }
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                message('You success logged in', true)
                localStorage.setItem('DataStorage', JSON.stringify({ token: data.token }))
                const userData = await getUserInfo()
                if (userData) {
                    setUserState(userData)
                }
                return { userInfo: userData }
            } else {
                message(data.message, false)
                return false
            }
        } catch (e) {
            message(e)
            return false
        }
    }

    const logout = () => {
        setUserState(null)
        localStorage.removeItem('DataStorage')
    }

    return {
        registration, login, message,
        logout
    }
}  