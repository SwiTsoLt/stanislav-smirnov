import { memo, useState } from "react"
import { useUser } from "../../../../hooks/user.hook"
import { DeleteButton } from "../../../UI/buttons/DeleteButton/DeleteButton"
import { EditButton } from "../../../UI/buttons/EditButton/EditButton"
import { MyButton } from "../../../UI/buttons/MyButton/MyButton"
import { SendButton } from "../../../UI/buttons/SendButton/SendButton"
import classes from "./UsersPanelUser.module.css"

export const UsersPanelUser = memo(({
    user, getUsersInfo, usersPage,
    getGeneralInfo
}) => {

    const [newUser, setNewUser] = useState(user)
    const [isEditing, setIsEditing] = useState(false)

    const { deleteUser, editUser } = useUser()

    const deleteUserHandler = async (userId) => {
        if (window.confirm("Are you sure you want to delete user?")) {
            const response = await deleteUser(userId)
            if (response) {
                await getUsersInfo(usersPage)
                await getGeneralInfo()
            }
        }
    }

    const editUserHandler = async (currentTextareaList, sending = false) => {
        if (sending) {
            const response = await editUser(newUser)

            if (!response) return

            const textareaList = currentTextareaList.querySelectorAll("textarea")
            textareaList.forEach(textarea => textarea.disabled = true)
            setIsEditing(false)
            return
        }
        setIsEditing(true)
        const textareaList = currentTextareaList.querySelectorAll("textarea")
        textareaList.forEach((textarea, index) => {
            textarea.disabled = false
            index === 0 && textarea.focus()
        })
    }

    const closeEditUserHandler = () => {
        setIsEditing(false)
        const userPanelUser = document.getElementById("userPanelUser")
        const textareaList = userPanelUser.querySelectorAll("textarea")
        textareaList.forEach(textarea => textarea.disabled = true)
        setNewUser(user)
    }

    return (
        <div id="userPanelUser" className={classes.userPanelUser}>
            <div className={classes.buttons}>
                <DeleteButton
                    type="user"
                    user={newUser}
                    deleteHandler={deleteUserHandler}
                />
                <EditButton
                    type="user"
                    editHandler={editUserHandler}
                />
                {
                    isEditing
                    &&
                    <SendButton
                        sendMethod="editPost"
                        functionHandler={editUserHandler}
                    />
                }
                {
                    isEditing
                    &&
                    <MyButton
                        type="cancellation-image"
                        functionHandler={closeEditUserHandler}
                    />
                }
            </div>
            <table className={classes.table} key={user._id}>
                <tbody>
                    <tr>
                        <td className={classes.userId}>User id</td>
                        <th>
                            <textarea
                                value={newUser._id}
                                onChange={e => setNewUser({ ...newUser, _id: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.userName}>User name</td>
                        <th>
                            <textarea
                                value={newUser.username}
                                onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.userPassword}>User password</td>
                        <th>
                            <textarea
                                value={newUser.password}
                                onChange={e => setNewUser({ ...newUser, password: e.target.password })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.userRoles}>User roles</td>
                        <th>
                            <textarea
                                value={
                                    !![(newUser.roles.toString().trim())].filter(e => e !== ",").join()
                                    && ([(newUser.roles.toString().trim())].filter(e => e !== ",")) || "none"
                                }
                                onChange={e => setNewUser({ ...newUser, roles: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.likesPosts}>Liked posts</td>
                        <th>
                            <textarea
                                value={
                                    !![(newUser.likedPosts.toString().trim())].filter(e => e !== ",").join()
                                    && ([(newUser.likedPosts.toString().trim())].filter(e => e !== ",")) || "none"
                                }
                                onChange={e => setNewUser({ ...newUser, likedPosts: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.commentedPosts}>Commented posts</td>
                        <th>
                            <textarea
                                value={
                                    !![(newUser.commentedPosts.toString().trim())].filter(e => e !== ",").join()
                                    && ([(newUser.commentedPosts.toString().trim())].filter(e => e !== ",")) || "none"
                                }
                                onChange={e => setNewUser({ ...newUser, commentedPosts: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.avatarName}>Avatar name</td>
                        <th>
                            <textarea
                                value={newUser.password}
                                onChange={e => setNewUser({ ...newUser, password: e.target.password })}
                                disabled
                            /></th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
})