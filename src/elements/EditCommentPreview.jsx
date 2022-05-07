import classesComments from "../styles/pages/Comments.module.css"
import { MyButton } from "./UI/buttons/MyButton/MyButton"

export const EditCommentPreview = ({ currentCommentText, closeEditCommentHandler }) => {
    return (
        <div id="editComment" className={`borderRadius ${classesComments.editCommentPreview}`}>
            <div className={classesComments.closeEditCommentButton}>
                <MyButton text="" type="cancellation-image" functionHandler={closeEditCommentHandler} />
            </div>
            <p>{currentCommentText}</p>
        </div>
    )
}