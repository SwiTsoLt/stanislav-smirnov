import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../../../hooks/user.hook";
import classes from "./EditButton.module.css"

export const EditButton = memo(({ post, comment, index, editHandler, type }) => {

    const [searchParams, _setSearchParams] = useSearchParams();
    const { userState } = useUser()

    return (

        <div className={classes.editButtonOuter}>
            {
                (type === "comment" && (comment && (userState?.userName === comment.username) || userState?.userRoles?.includes("ADMIN")))
                    ?
                    <button
                        className={classes.editButton}
                        onClick={() => editHandler(searchParams.get("postId") || post._id, index, comment.text, null)}
                    ></button>
                    : (type === "post")
                    ?
                    <button
                        className={classes.editButton}
                        onClick={e => editHandler(e.currentTarget.parentNode.parentNode.parentNode, false)}
                    >
                    </button>

                    : (type === "user")
                    ?
                    <button
                        className={classes.editButton}
                        onClick={e => editHandler(e.currentTarget.parentNode.parentNode.parentNode, false)}
                    >
                    </button>

                    : <div></div>
            }
        </div>
    )
})