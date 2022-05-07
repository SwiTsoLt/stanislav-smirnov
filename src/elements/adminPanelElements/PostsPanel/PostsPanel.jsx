import { memo, useEffect, useState } from "react"
import { useAuth } from "../../../hooks/auth.hook"
import { usePosts } from "../../../hooks/posts.hook"
import classes from "./PostsPanel.module.css"
import classesComments from "../../../styles/pages/Comments.module.css"
import { Loader } from "../../Loader"
import { MyInput } from "../../UI/MyInput/MyInput"
import { EditCommentPreview } from "../../EditCommentPreview"
import { useLang } from "../../../hooks/lang.hook"
import { PostPanelPost } from "./elements/PostPanelPost"
import { useUser } from "../../../hooks/user.hook"

export const PostsPanel = memo(({
    getPostsInfo, generalInfo, postsPage, postsList,
    prevPostsInfoPage, nextPostsInfoPage,
    setSendMethod
}) => {

    const [searchLimit, _setSearchLimit] = useState(5)
    const [commentText, setCommentText] = useState()
    const [currentCommentText, setCurrentCommentText] = useState()
    const [currentCommentEditId, setCurrentCommentEditId] = useState()
    const [commentIndex, setCommentIndex] = useState(0)

    const { ready } = useUser()
    const { langList, lang } = useLang()
    const { deleteComment, editComment } = usePosts()

    const deleteCommentHandler = async (postId, commentIndex) => {
        if (window.confirm("Are you sure you want to delete comment?")) {
            const response = await deleteComment(postId, commentIndex)
            if (response) {
                await getPostsInfo(postsPage)
            }
        }
    }

    const editCommentHandler = async (postId, commentIndex, currentText, editCommentText) => {

        if (editCommentText) {
            const response = await editComment(postId, commentIndex, editCommentText)
            if (response) {
                const inputPanel = document.getElementById("inputPanel")
                inputPanel.classList.remove(classes.active)

                const editCommentHtml = document.getElementById("editComment")
                editCommentHtml.classList.remove(classesComments.active)

                setCommentText('')
                await getPostsInfo()
            }
        } else {
            setCurrentCommentText(currentText)

            const inputPanel = document.getElementById("inputPanel")
            inputPanel.classList.toggle(classes.active)

            const myInput = document.getElementById('commTextarea')
            myInput.focus()

            setCurrentCommentEditId(postId)
            myInput.innerText = currentText

            const editCommentHtml = document.getElementById("editComment")
            editCommentHtml.classList.toggle(classesComments.active)

            !commentText && setCommentText(currentText)
            setCommentIndex(commentIndex)
        }
    }

    const closeEditCommentHandler = () => {
        const editCommentHtml = document.getElementById("editComment")
        editCommentHtml.classList.remove(classesComments.active)

        const inputPanel = document.getElementById("inputPanel")
        inputPanel.classList.remove(classes.active)

        setCommentText(null)
        setSendMethod("post")
        setCommentText('')
    }

    if (!ready) {
        return <Loader />
    }

    return (
        <div className={`borderRadius ${classes.postsPanel}`}>
            <h2 className="center">
                Posts information
                {console.log(Number(Math.ceil(generalInfo.amountPosts / searchLimit)))}
                <span>
                    (Page:  {postsPage}/{
                        Number(Math.ceil(generalInfo.amountPosts / searchLimit)) === 0
                            ? 1
                            : Number(Math.ceil(generalInfo.amountPosts / searchLimit))
                    })
                </span>
            </h2>
            <div className={classes.postsList}>
                {
                    (ready && postsPage > 1)
                    &&
                    <div className={classes.nextPosts}>
                        <button
                            className={classes.prevPostsButton}
                            onClick={() => prevPostsInfoPage()}
                        ></button>
                    </div>
                }
                {
                    postsList.length
                    ? postsList.map(post => {
                        return (
                            <PostPanelPost
                                key={post._id}
                                post={post}
                                getPostsInfo={getPostsInfo}
                                deleteCommentHandler={deleteCommentHandler}
                                editCommentHandler={editCommentHandler}
                            />
                        )
                    })

                    : <h2 className={classes.center}>There are no posts yet</h2>
                }
                {
                    (ready && searchLimit < (generalInfo.amountPosts - ((postsPage - 1) * searchLimit)))
                    &&
                    <div className={classes.nextPosts}>
                        <button
                            className={classes.nextPostsButton}
                            onClick={() => nextPostsInfoPage()}
                        ></button>
                    </div>

                }
            </div>
            <div id="inputPanel" className={classes.inputPanel}>
                <EditCommentPreview
                    currentCommentText={currentCommentText}
                    closeEditCommentHandler={closeEditCommentHandler}
                />
                <MyInput
                    setCommentText={setCommentText}
                    commentText={commentText}
                    langList={langList}
                    sendMethod="edit"
                    searchParams={{ get: () => currentCommentEditId }}
                    lang={lang}
                    editCommentHandler={editCommentHandler}
                    commentIndex={commentIndex}
                />
            </div>
        </div>
    )
})