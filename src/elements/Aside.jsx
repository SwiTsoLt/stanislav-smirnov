import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import { useLang } from "../hooks/lang.hook";
import { useUser } from "../hooks/user.hook";
import classes from "../styles/elements/Aside.module.css"

export const Aside = memo(({ asideProps, setAsideProps }) => {

    const { logout } = useAuth()
    const { langList, lang } = useLang()
    const { userState, ready } = useUser()

    const [textLang, setTextLang] = useState('en')
    useEffect(() => {
        if (ready) {
            const data = JSON.parse(localStorage.getItem("DataStorage"))
            if (data && data.lang) {
                setAsideProps({ ...asideProps, lang: data.lang })
            }
            setTextLang(lang)
        }
    }, [lang, ready])

    const logoutHandler = async (e) => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout()
            setAsideProps({ ...asideProps, isAuth: false, roles: ["USER"] })
            closeMenu()
        }
        e.preventDefault()
    }

    const menuHandler = (e) => {
        const blackWall = document.getElementById("blackWall")
        blackWall.classList.toggle('show')
        e.parentElement.classList.toggle('active')
    }

    const closeMenu = () => {
        const blackWall = document.getElementById("blackWall")
        blackWall.classList.remove('show')
        const aside = document?.getElementById('aside')
        aside?.classList.remove('active')
    }

    const clickHandler = (pageUrl) => {
        const blackWall = document.getElementById("blackWall")
        blackWall.classList.remove('show')
        closeMenu()
        setAsideProps({ ...asideProps, page: pageUrl })
    }

    useEffect(() => {
        setTextLang(asideProps.lang)
    }, [asideProps.lang, userState, ready])

    return (
        <aside id="aside" className="borderRadius ">
            <ul id="asideList" className={classes.aside_list}>
                {ready && !asideProps.isAuth && <li><Link onClick={() => closeMenu()} to="/auth"><span className="link_login">{langList.elements.aside.authorization[asideProps.lang]}</span></Link></li>}
                <li><Link onClick={() => clickHandler('/profile')} to="/profile">{langList.elements.aside.profile[textLang]}</Link></li>
                <li><Link onClick={() => clickHandler('/news')} to="/news">{langList.elements.aside.news[textLang]}</Link></li>
                <li><Link onClick={() => clickHandler('/projects')} to="/projects">{langList.elements.aside.projects[textLang]}</Link></li>
                <li><Link onClick={() => clickHandler('/contacts')} to="/contacts">{langList.elements.aside.contacts[textLang]}</Link></li>
                <li><Link onClick={() => clickHandler('/settings')} to="/settings">{langList.elements.aside.settings[textLang]}</Link></li>
                <li><Link onClick={() => clickHandler('/about')} to="/about">{langList.elements.aside.about[textLang]}</Link></li>
                {ready && asideProps.isAuth && asideProps.roles.includes("ADMIN") && <li><Link to="/adminPanel" onClick={() => clickHandler('/adminPanel')} ><span className="linkAdminPanel">Admin panel</span></Link></li>}
                {ready && asideProps.isAuth && <li><Link to="/" onClick={e => logoutHandler(e)}><span className="link_logout">{langList.elements.aside.signOut[textLang]}</span></Link></li>}
            </ul>
            <div
                onClick={e => menuHandler(e.target)}
                className="aside_after"
            ></div>
        </aside>
    )
})