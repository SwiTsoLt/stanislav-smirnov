import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { Comment } from "../elements/Comment";
import { EditCommentPreview } from "../elements/EditCommentPreview";
import { Img } from "../elements/Img";
import { Loader } from "../elements/Loader";
import { MyInput } from "../elements/UI/MyInput/MyInput";
import { useLang } from "../hooks/lang.hook";
import { useMessage } from "../hooks/message.hook";
import { usePosts } from "../hooks/posts.hook";
import { useUser } from "../hooks/user.hook";
import classes from '../styles/pages/Comments.module.css'
import classesPosts from '../styles/pages/News.module.css'

export const Comments = () => {

    const navigate = useNavigate();
    const message = useMessage()

    const [searchParams, _setSearchParams] = useSearchParams();

    const [sendMethod, setSendMethod] = useState('post')
    const [commentsList, setCommentsList] = useState()
    const [commentText, setCommentText] = useState()
    const [currentCommentText, setCurrentCommentText] = useState()
    const [commentIndex, setCommentIndex] = useState(0)

    const { lang, langList } = useLang()
    const { postComment, getComments, deleteComment, editComment } = usePosts()
    const { ready, setReady } = useUser()

    const getCommentsList = async () => {
        setReady(false)
        const response = await getComments(searchParams.get("postId"))
        response && setCommentsList(response)
        !response && navigate('/news')
        setReady(true)
        return response
    }

    const closeEditCommentHandler = () => {
        const editCommentHtml = document.getElementById("editComment")
        editCommentHtml.classList.remove(classes.active)
        setCurrentCommentText(null)
        setSendMethod("post")
        setCommentText('')
    }

    const postCommentHandler = async (text) => {
        if (text.trim()) {
            const response = await postComment(text.trim(), searchParams.get("postId"))
            if (response) {
                setCommentText('')
                await getCommentsList()
            }
            return
        }
        return message("The comment should not be empty", false)
    }

    const deleteCommentHandler = async (postId, commentIndex) => {
        if (window.confirm("Are you sure you want to delete comment?")) {
            const response = await deleteComment(postId, commentIndex)
            response && getCommentsList()
        }
    }

    const editCommentHandler = async (postId, commentIndex, text, editCommentText) => {
        const myInput = document.getElementById('commTextarea')
        myInput.focus()

        setCurrentCommentText(text)

        if (!!editCommentText) {
            const response = await editComment(postId, commentIndex, commentText)
            if (response) {
                setSendMethod("post")
                setCommentText('')
                await getCommentsList()
            }
        } else {
            const editCommentHtml = document.getElementById("editComment")
            editCommentHtml.classList.toggle(classes.active)
            if (sendMethod === 'edit') {
                setSendMethod("edit")
            } else {
                setSendMethod("post")
                setCommentText('')
            }
            !commentText && setCommentText(text)
            setCommentIndex(commentIndex)
        }
    }

    useEffect(() => {
        getCommentsList()
    }, [])

    if (!ready) {
        return <Loader />
    }

    return (
        <div className={classes.comments}>
            <div className={classes.comments__inner}>
                <div className={`borderRadius ${classes.postInfoContainer}`}>
                    <Link to="/news" className={classes.closePage}></Link>
                    {
                        searchParams.get("postTittle") !== 'undefined' && searchParams.get("postTittle") !== 'null'
                        && ready
                        && <div className={classesPosts.postTitle}>{searchParams.get("postTittle")}</div>
                    }
                    {
                        searchParams.get("postImageName") !== 'undefined' && searchParams.get("postImageName") !== 'null'
                        && ready
                        && <div className={classesPosts.postImage}>
                            <Img imageName={searchParams.get("postImageName")} imageType="post" />
                        </div>
                    }
                    {
                        searchParams.get("postBody") !== 'undefined' && searchParams.get("postBody") !== 'null'
                        && ready
                        && <div className={classesPosts.postContent}>{searchParams.get("postBody")}</div>
                    }
                </div>
                {
                    commentsList && commentsList.length
                        ?
                        <>
                            <div className={`borderRadius ${classes.commentsTitle}`}>
                                <h2>Commnets</h2>
                            </div>
                            <div className={classes.commentsList}>
                                {
                                    commentsList.map((comment, index) => {
                                        return (
                                            <Comment
                                                key={index}
                                                comment={comment}
                                                index={index}
                                                deleteCommentHandler={deleteCommentHandler}
                                                editCommentHandler={editCommentHandler}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </>
                        :
                        <div className={`borderRadius ${classes.noComments}`}>
                            <h1>There is no comments yet</h1>
                        </div>
                }
            </div>
            <div className={classes.commentForm}>
                {
                    !searchParams.get("postImageName") && searchParams.get("postImageName") === 'undefined' && searchParams.get("postImageName") === 'null'
                    && <div className={classes.hr}></div>
                }
                <EditCommentPreview
                    currentCommentText={currentCommentText}
                    closeEditCommentHandler={closeEditCommentHandler}
                />
                <MyInput
                    setCommentText={setCommentText}
                    commentText={commentText}
                    langList={langList}
                    sendMethod={sendMethod}
                    searchParams={searchParams}
                    lang={lang}
                    postCommentHandler={postCommentHandler}
                    editCommentHandler={editCommentHandler}
                    commentIndex={commentIndex}
                />
            </div>
        </div>
    )
}