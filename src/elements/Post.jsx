import { memo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMessage } from "../hooks/message.hook"
import { usePosts } from "../hooks/posts.hook"
import { useUser } from "../hooks/user.hook"
import classes from "../styles/pages/News.module.css"
import { Img } from "./Img"

export const Post = memo(({ post, userId }) => {

    const navigate = useNavigate()
    const { userState } = useUser()
    const message = useMessage()
    const { likesUpdate } = usePosts()

    const [momentLike, setMomentLike] = useState({ active: true, wasLiked: 1 })

    const likeHandler = async (e, postId) => {
        e.classList.toggle(classes.active)
        const response = await likesUpdate(postId)
        
        if (response) {
            if (!!e.classList[1] && response.enter) {
                setMomentLike({ active: true, wasLiked: momentLike.wasLiked === 0 ? 1 : 2 })
                e.classList.add(classes.active)
                return true
            }
            setMomentLike({ active: false, wasLiked: momentLike.wasLiked === 2 ? 1 : 0 })
            e.classList.remove(classes.active)
            return true
        }

        e.classList.remove(classes.active)
        return false
    }

    const checkUserAuth = () => {
        if (!userState || !userState.userId) {
            return message("User not authorized", false)
        }
        return navigate(`/comments?postId=${post._id}&postTittle=${post.title}&postImageName=${post.imageName}&postBody=${post.body}`)
    }

    return (
        <div className={`borderRadius ${classes.post}`}>
            <div className={classes.postTitle}>{post.title}</div>
            {
                post.imageName
                &&
                <div className={classes.postImage}>
                    {<Img imageName={post.imageName} imageType="post" />}
                </div>
            }
            {post.body === "undefined" ? "" : !!post.body && <div className={classes.postContent}>{post.body}</div>}
            {!post.imageName && <div className="hr"></div>}
            <div className={classes.post_likeComm}>
                <div className={classes.post_likes}>
                    <button
                        className={`${classes.likeBtn} ${post.likes.includes(userId) ? classes.active : ""}`}
                        onClick={e => likeHandler(e.target, post._id)}
                    ></button>
                    <span className={classes.likeCount}>
                        {momentLike.active && (Number(post.likes.length) + (momentLike.wasLiked === 2 ? 1 : 0))}
                        {!momentLike.active && (Number(post.likes.length) - (momentLike.wasLiked === 1 ? 0 : 1))}
                    </span>
                </div>
                <div className={classes.post_comm}>
                    <button
                        className={classes.commBtn}
                        onClick={() => checkUserAuth()}
                    ></button>
                    <span className={classes.commCount}>{post.comments.length}</span>
                </div>
            </div>
        </div>
    )
})