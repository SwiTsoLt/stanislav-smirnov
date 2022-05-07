import { memo, useState } from "react"
import { usePosts } from "../../../../hooks/posts.hook"
import { DeleteButton } from "../../../UI/buttons/DeleteButton/DeleteButton"
import { EditButton } from "../../../UI/buttons/EditButton/EditButton"
import { Comment } from "../../../Comment"
import { MyButton } from "../../../UI/buttons/MyButton/MyButton"
import classes from "./PostPanelPost.module.css"
import { SendButton } from "../../../UI/buttons/SendButton/SendButton"

export const PostPanelPost = memo(({
    post, deleteCommentHandler, editCommentHandler,
    getPostsInfo, getGeneralInfo
}) => {

    const [newPost, setNewPost] = useState({ ...post })
    const [isEditing, setIsEditing] = useState(false)

    const { deletePost, editPost } = usePosts()

    const deletePostHandler = async (postId) => {
        if (window.confirm("Are you sure you want to delete post?")) {
            const response = await deletePost(postId)
            if (response) {
                await getPostsInfo()
                await getGeneralInfo()
            }
        }
    }

    const editPostHandler = async (currentTextareaList, sending = false) => {
        if (sending) {
            const response = editPost(newPost)
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

    const closeEditPostHandler = () => {
        setIsEditing(false)
        const postPanelPost = document.getElementById("postPanelPost")
        const textareaList = postPanelPost.querySelectorAll("textarea")
        textareaList.forEach(textarea => textarea.disabled = true)
        setNewPost(post)
    }

    return (
        <div id="postPanelPost" className={classes.postPanelPost}>
            <div className={classes.buttons}>
                <DeleteButton
                    type="post"
                    post={newPost}
                    deleteHandler={deletePostHandler}
                />
                <EditButton
                    type="post"
                    editHandler={editPostHandler}
                />
                {
                    isEditing
                    &&
                    <SendButton
                        sendMethod="editPost"
                        functionHandler={editPostHandler}
                    />
                }
                {
                    isEditing
                    &&
                    <MyButton
                        type="cancellation-image"
                        functionHandler={closeEditPostHandler}
                    />
                }
            </div>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        <td className={classes.postId}>
                            Post id
                        </td>
                        <th>
                            <textarea
                                value={newPost._id}
                                onChange={e => setNewPost({ ...newPost, _id: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.postTitle}>
                            Post title
                        </td>
                        <th>
                            <textarea
                                value={newPost.title}
                                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.postBody}>
                            Post body
                        </td>
                        <th>
                            <textarea
                                value={newPost.body}
                                onChange={e => setNewPost({ ...newPost, body: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.postLikes}>
                            likes
                        </td>
                        <th>
                            <textarea
                                value={
                                    !![(newPost.likes.toString().trim())].filter(e => e !== ",").join()
                                        && ([(newPost.likes.toString().trim())].filter(e => e !== ",")) || "none"
                                        
                                }
                                onChange={e => setNewPost({ ...newPost, likes: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.postImageName}>
                            Post image
                        </td>
                        <th>
                            <textarea
                                value={newPost.imageName}
                                onChange={e => setNewPost({ ...newPost, image: e.target.value })}
                                disabled
                            />
                        </th>
                    </tr>
                    <tr>
                        <td className={classes.postComments}>Comments</td>
                        <th className={classes.postCommentsList}>
                            {newPost.comments.map((comment, index) => {
                                return (
                                    <Comment
                                        key={index}
                                        post={newPost}
                                        comment={comment}
                                        index={index}
                                        deleteCommentHandler={deleteCommentHandler}
                                        editCommentHandler={editCommentHandler}
                                    />
                                )
                            })}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
})