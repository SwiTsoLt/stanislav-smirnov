import { useEffect } from "react"
import { useState } from "react"

export const useLang = () => {
    const [lang, setLang] = useState('en')

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("DataStorage"))
        if (data && data.lang) {
            setLang(data.lang)
        }
    }, [])

    const langList = {
        elements: {
            aside: {
                authorization: { en: "Log in", ru: "Войти" },
                profile: { en: "Profile", ru: "Профиль" },
                news: { en: "News", ru: "Новости" },
                projects: { en: "Projects", ru: "Проекты" },
                contacts: { en: "Contacts", ru: "Контакты" },
                settings: { en: "Settings", ru: "Настройки" },
                about: { en: "About me", ru: "Обо мне" },
                signOut: { en: "Sign out", ru: "Выйти" }
            },
            search: {
                inputPlaceHolder: { en: "Search...", ru: "Поиск..." }
            },
            commentsPopup: {
                inputPlaceHolder: {en: "Your comment...", ru: "Ваш комментарий..."}
            }
        },
        pages: {
            auth: {
                authMethod: {
                    login: {
                        title: { en: "Login", ru: "Вход" },
                        inputPlaceHolder: {
                            name: { en: "Your name...", ru: "Ваше имя..." },
                            password: { en: "Your password...", ru: "Ваш пароль..." }
                        }
                    },
                    registration: {
                        title: { en: "Registration", ru: "Регистрация" },
                        inputPlaceHolder: {
                            name: { en: "Your name...", ru: "Ваше имя..." },
                            password: { en: "Your password...", ru: "Ваш пароль..." },
                            confirmPassword: { en: "Confirm password...", ru: "Подтвердите пароль..." }
                        }
                    }
                },
                button: { en: "Ok", ru: "Ок" }

            },
            settings: {
                lang: { en: "User language", ru: "Язык пользователя" }
            },
            profile: {
                name: { en: "Name", ru: "Имя" }
            }
        }
    }

    const getLang = () => { return lang }

    return { lang, setLang, langList, getLang }
}