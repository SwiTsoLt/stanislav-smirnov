import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../../../hooks/user.hook";
import classes from "./DeleteButton.module.css"

export const DeleteButton = memo(({ user, post, comment, index, deleteHandler, type }) => {

    const [searchParams, _setSearchParams] = useSearchParams();
    const { userState } = useUser()

    return (

        <div className={classes.deleteButtonOuter}>
            {
                (type === "comment" && comment && ((userState?.userName === comment.username) || userState?.userRoles?.includes("ADMIN")))
                ?
                <button
                    className={classes.deleteButton}
                    onClick={() => deleteHandler(searchParams.get("postId") || post._id, index)}
                ></button>
                
                : (type === "post")
                ?
                <button
                    className={classes.deleteButton}
                    onClick={() => deleteHandler(post._id)}
                ></button>

                : (type === "user") 
                ?
                <button
                    className={classes.deleteButton}
                    onClick={() => deleteHandler(user._id)}
                ></button>

                : <div></div>
            }
        </div>
    )
})