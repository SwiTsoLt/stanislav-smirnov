import { memo } from "react"
import classes from "./SendButton.module.css"

export const SendButton = memo(({
    sendMethod, commentText, searchParams,
    functionHandler, commentIndex
}) => {

    if (sendMethod === "editPost") {
        return (
            <button
                onClick={e => functionHandler(e.currentTarget.parentNode.parentNode.parentNode, true)}
                className={classes.sendEditPostBtn}
            ></button>
        )
    }

    return (
        <button
            onClick={() => {
                sendMethod === "post" && functionHandler(commentText)
                sendMethod === "edit" && functionHandler(searchParams.get("postId"), commentIndex, null, commentText)
            }}
            className={classes.sendBtn}
        ></button>
    )
})