import React, { useEffect, useState } from "react"
import { useImage } from "../hooks/image.hook"
import { useLang } from "../hooks/lang.hook"
import classes from '../styles/pages/Profile.module.css'
import defaultAvatar from '../images/elements/avatar.png'
import { useMessage } from "../hooks/message.hook"
import { useAuth } from "../hooks/auth.hook"
import { Img } from "../elements/Img"
import { useUser } from "../hooks/user.hook"

export const Profile = () => {

    const [file, setFile] = useState()

    const { lang, langList } = useLang()
    const { setUserAvatar } = useImage()
    const message = useMessage()
    const { userState, setUserState, ready }  = useUser()

    const setFileHandler = async (item) => {
        const data = JSON.parse(localStorage.getItem("DataStorage"))

        if (item) {
            if (data && data.token) {
                const { avatarName } = await setUserAvatar(data.token, item)
                setFile("")
                const inputAvatar = document.getElementById("inputAvatar")
                inputAvatar.value = ""
                return setUserState({ ...userState, avatarName })
            }
            return message("User not authorized", false)
        }
        return message("You did not choose the file", false)
    }

    return (
        <div className={classes.profilePage}>
            <div className={classes.profile_inner}>
                <div className={`borderRadius ${classes.userImage_outer}`}>
                    {
                        ready && userState && userState.avatarName
                            ? <Img imageName={userState.avatarName} imageType="userAvatar" />
                            : <img alt="" src={defaultAvatar} className={classes.userImageDefault} />
                    }
                </div>
                <div className={`borderRadius ${classes.userInfo}`}>
                    {ready && userState && <div className={classes.userName}>{langList.pages.profile.name[lang]}: {userState.userName}</div>}
                </div>
                <div className={`borderRadius ${classes.imageForm}`}>
                    <input
                        id="inputAvatar"
                        accept="image/*"
                        type="file"
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <button onClick={() => setFileHandler(file)}>send</button>
                </div>
            </div>
        </div>
    )
}