import { useEffect, useState } from "react"
import { useMessage } from "./message.hook"

export const useUser = () => {

    const [ready, setReady] = useState(false)
    const [userState, setUserState] = useState()

    const message = useMessage()

    const getUserInfo = async () => {
        try {
            const data = JSON.parse(localStorage.getItem("DataStorage"))
            if (data && data.token) {
                const url = "api/users/getUserInfo"
                const options = {
                    "method": "get",
                    "headers": {
                        "authorization": `Bearer ${data.token}`
                    }
                }
                const response = await fetch(url, options)
                if (response && response.ok) {
                    const userData = await response.json()
                    if (userData && userData.userInfo) {
                        setUserState(userData.userInfo)
                        return userData.userInfo
                    }

                    return false
                }

                if (response && !response.ok) {
                    const data = await response.json()
                    if (data && data.errors) {
                        data.errors.map(error => {
                            console.log(error.message);
                            message(error.message, false)
                        })
                        return false
                    }

                    return false
                }

                return false
            }
            return false
        } catch (e) {
            console.log(e);
            return false
        }
    }

    const getUsers = async (page) => {
        try {
            const data = JSON.parse(localStorage.getItem("DataStorage"))
            if (data && data.token) {
                const url = `api/users/getUsers/?page=${page}`
                const options = {
                    "method": "get",
                    "headers": {
                        "authorization": `Bearer ${data.token}`
                    }
                }
                const response = await fetch(url, options)
                if (response && response.ok) {
                    const usersData = await response.json()
                    if (usersData && usersData.users) {
                        return { users: usersData.users }
                    }

                    message("Something went wrong", false)
                    return false
                }
                if (response && !response.ok) {
                    const usersData = await response.json()
                    if (usersData && usersData.errors) {
                        usersData.errors.map(error => {
                            console.log(error.message);
                            message(error.message, false)
                        })
                        return false
                    }

                    message("Something went wrong", false)
                    return false
                }

                message("Something went wrong", false)
                return false
            }

            message("User not authorized", false)
            return false
        } catch (e) {
            console.log(e);
            message("Something went wrong", false)
            return false
        }
    }

    const deleteUser = async (userId) => {
        try {
            const data = JSON.parse(localStorage.getItem("DataStorage"))
            if (data && data.token) {
                const url = `api/users/deleteUser?userId=${userId}`
                const options = {
                    "method": "get",
                    "headers": {
                        "authorization": `Bearer ${data.token}`
                    }
                }
                const response = await fetch(url, options)
                if (response && response.ok) {
                    const deleteData = await response.json()

                    if (deleteData && deleteData.message) {
                        message(deleteData.message, true)
                        return true
                    }
                    return false
                }

                if (response && !response.ok) {
                    const deleteData = await response.json()
                    if (deleteData && deleteData.errors) {
                        deleteData.errors.map(error => {
                            console.log(error.message);
                            message(error.message, false)
                        })
                        message("Something went wrong", false)
                        return false
                    }

                    message("User not authorized", false)
                    return false
                }
            }
        } catch (e) {
            console.log(e);
            message("Something went wrong", false)
            return false
        }
    }

    const editUser = async (newUser) => {
        try {
            const data = JSON.parse(localStorage.getItem("DataStorage"))
            if (data && data.token) {
                const url = "api/users/editUser"
                const options = {
                    "method": "post",
                    "headers": {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${data.token}`
                    },
                    "body": JSON.stringify({
                        newUser: {...newUser}
                    })
                }

                const response = await fetch(url, options)
                if (response && response.ok) {
                    const editData = await response.json()

                    if (editData && editData.message) {
                        message(editData.message, true)
                        return true
                    }
                    message("Something went wrong", false)
                    return false
                }

                if (response && !response.ok) {
                    const editData = await response.json()
                    if (editData && editData.errors) {
                        editData.errors.map(error => {
                            console.log(error.message);
                            message(error.message, false)
                        })
                        return false
                    }

                    message("Something went wrong", false)
                    return false
                }

                message("Something went wrong", false)
                return false
            }

            message("User not authorized", false)
            return false
        } catch (e) {
            console.log(e);
            message("Something went wrong", false)
            return false
        }
    }

    const getUserInfoAsync = async () => {
        setReady(false)
        await getUserInfo()
        setReady(true)
    }

    useEffect(() => getUserInfoAsync(), [])

    return {
        getUserInfo, getUsers, userState,
        setUserState, ready, setReady,
        deleteUser, editUser
    }
}