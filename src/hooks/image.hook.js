import { useMessage } from "./message.hook"
import FormData from 'form-data'
import axios from 'axios';

export const useImage = () => {

    const message = useMessage()

    const setUserAvatar = async (token, file) => {
        if (token) {
            const formData = new FormData()
            formData.append('file', file)

            const url = "/api/fs/setUserAvatar"
            const options = {
                "method": "get",
                "headers": {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }

            if (file) {
                try {
                    const response = await axios.post(url, formData, options)
                        .catch(async (e) => {
                            const data = JSON.parse(e.response.request.response, options)
                            return message(data.message, false)
                        })
                    if (
                        response && response.statusText === "OK"
                        && response.data && response.data.avatarName
                    ) {
                        message(response.data.message, true)
                        return { avatarName: response.data.avatarName }
                    }
                    return false
                } catch (e) {
                    return false
                }
            }
        }
        message("User not authorized", false)
        return false
    }

    const getUserAvatarName = async (userName) => {
        const url = `/api/fs/getUserAvatarName/${userName}`
        const options = {
            "method": "get",
        }

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                if (data && data.avatarName) {
                    return { userAvatarName: data.avatarName }
                }
                else if (data && data.message) {
                    message(data.message, false)
                    return false
                }
                return false
            }
            return false
        } catch (e) {
            return false
        }
    }
    return { setUserAvatar, getUserAvatarName }
}