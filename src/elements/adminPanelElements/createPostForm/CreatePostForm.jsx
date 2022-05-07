import { memo, useState } from "react"
import { usePosts } from "../../../hooks/posts.hook"
import { MyButton } from "../../UI/buttons/MyButton/MyButton"
import classes from "./CreatePostForm.module.css"

export const CreatePostForm = memo(({ getGeneralInfo, setPostsList }) => {

    const [isShow, setIsShow] = useState(false)
    const [file, setFile] = useState()
    const [postTitle, setPostTitle] = useState()
    const [postBody, setPostBody] = useState()

    const { createPost, getPosts } = usePosts()

    const createPostHandler = async (title, body, postFile) => {
        const response = await createPost(title, body, postFile)
        console.log(response);
        if (response) {
            const data = await getPosts()
            setPostsList(data)
            await getGeneralInfo()
        }
        setPostTitle("")
        setPostBody("")

        const inputPostImage = document.getElementById("inputPostImage")
        inputPostImage.value = ""
    }

    return (
        <div className={`borderRadius ${classes.createPostForm}`}>
            <div className={classes.createPostForm_inner}>
                <div className={classes.formTitle}>
                    <h2>Create new post</h2>
                    {
                        isShow
                            ?
                            <MyButton
                                type="hideFormBtn"
                                functionHandler={() => setIsShow(false)}
                            />
                            :
                            <MyButton
                                type="showFormBtn"
                                functionHandler={() => setIsShow(true)}
                            />
                    }
                </div>

                <div className={`${classes.form} ${isShow && classes.active}`}>
                    <div className={classes.br}></div>
                    <p>Post title</p>
                    <textarea
                        className={classes.firstTextArea}
                        onChange={e => setPostTitle(e.target.value)}
                        value={postTitle}
                        maxLength="200"
                        type="text"
                    />
                    <p>Post body</p>
                    <textarea
                        onChange={e => setPostBody(e.target.value)}
                        value={postBody}
                        maxLength="600"
                        type="text"
                    />
                    <p>Post Image</p>
                    <label
                        htmlFor="inputPostImage"
                        className={classes.postImageLabel}
                    >
                        Post Image Upload:&nbsp;
                        <span>{file?.name || "none"}</span>
                    </label>
                    <input
                        id="inputPostImage"
                        accept="image/*"
                        type="file"
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <div className={classes.form_btn}>
                        <button onClick={() => createPostHandler(postTitle, postBody, file)}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
})