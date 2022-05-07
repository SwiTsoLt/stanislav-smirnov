import { useCallback, useEffect, useMemo, useState, memo } from "react"
import { useAuth } from "../hooks/auth.hook"
import { useImage } from "../hooks/image.hook"
import classes from "../styles/elements/Comment.module.css"
import { DeleteButton } from "./UI/buttons/DeleteButton/DeleteButton"
import { EditButton } from "./UI/buttons/EditButton/EditButton"
import { Img } from "./Img"
import { useUser } from "../hooks/user.hook"

export const Comment = memo(({ post, comment, index, deleteCommentHandler, editCommentHandler }) => {

    const { getUserAvatarName } = useImage()
    const { userState, ready } = useUser()

    const [avatarName, setAvatarName] = useState()

    const getAvatarName = async (userName, cf) => {
        const data = await getUserAvatarName(userName)
        if (!cf) {
            setAvatarName(data.userAvatarName)
        }
    }

    useMemo(() => {
        let cleanupFunction = false
        getAvatarName(comment.username, cleanupFunction)
        return () => cleanupFunction = true
    }, [comment.username])

    if (!ready && !comment) {
        return <div></div>
    }

    return (
        <div className={`borderRadius ${classes.comment}`}>
            <div className={classes.commentContainer}>
                {
                    userState && userState.avatarName
                        ?
                        <div className={classes.commentOwnerAvatar}>
                            <Img imageName={avatarName} imageType="userAvatar" />
                        </div>
                        :
                        <div className={classes.emptyAvatar}></div>
                }
                <div className={classes.userNameAndCommentTextBlock}>
                    <div className={classes.commentOwnerName}>
                        {comment && comment.username && comment.username}
                    </div>
                    <div className={classes.commentText}>
                        {comment && comment.text && comment.text}
                    </div>
                </div>
            </div>
            <div className={classes.buttons}>
                <EditButton
                    type="comment"
                    comment={comment}
                    index={index}
                    editHandler={editCommentHandler}
                    post={post}
                />
                <DeleteButton
                    type="comment"
                    post={post}
                    comment={comment}
                    index={index}
                    deleteHandler={deleteCommentHandler}
                />
            </div>
        </div>
    ) 
})