import { useEffect } from 'react'
import { useLang } from '../hooks/lang.hook'
import classes from '../styles/pages/Settings.module.css'

export const Settings = ({ asideProps, setAsideProps }) => {

    const { lang, setLang, langList } = useLang()

    const changeLangHandler = (lang) => {
        setLang(lang)
        setAsideProps({ ...asideProps, lang: lang })
        const data = JSON.parse(localStorage.getItem("DataStorage"))
        localStorage.setItem("DataStorage", JSON.stringify({ ...data, lang }))
    }

    return (
        <div className={classes.settings}>
            <ul className={classes.settingList}>
                <li className={`borderRadius ${classes.setting_lang} ${classes.setting}`}>
                    <p>{langList.pages.settings.lang[lang]}:</p>
                    <select
                        className={classes.lang_list}
                        onChange={e => changeLangHandler(e.target.value)}
                        name="lang"
                    >
                        {
                            lang === "en"
                                ? <>
                                    <option value="en" selected="selected">English</option>
                                    <option value="ru">Русский</option>
                                </>
                                : <>
                                    <option value="en">English</option>
                                    <option value="ru" selected="selected">Русский</option>
                                </>
                        }
                    </select>
                </li>
            </ul>
        </div>
    )
}