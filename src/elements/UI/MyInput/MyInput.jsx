import { useEffect } from 'react';
import { useAuth } from '../../../hooks/auth.hook';
import { SendButton } from '../buttons/SendButton/SendButton';
import classes from './MyInput.module.css';

export const MyInput = (
    {
        setCommentText, commentText, langList,
        sendMethod, searchParams, lang, postCommentHandler, editCommentHandler,
        commentIndex
    }) => {

    const resizeTextareaHandler = () => {
        const commTextarea = document.getElementById('commTextarea')
        if (commTextarea) {
            const commTextareaStyles = window.getComputedStyle(commTextarea)
            const textFontSizeStyle = commTextareaStyles.getPropertyValue("font-size")
            const textFontSizeValue = Number([...textFontSizeStyle].filter(e => Number(e) || e === '.').join(''))
            const textareaScrollWith = commTextarea.scrollWidth
            const textLength = commTextarea.textLength
            const letterWidth = ((textFontSizeValue / 12.5) * 7.5)
            const rows = Math.floor((textLength * letterWidth) / textareaScrollWith)
            commTextarea.style.height = `${2.4 + 1.2 * rows}em`
        }
    }

    useEffect(() => resizeTextareaHandler(), [commentText])

    return (
        <div className={`borderRadius ${classes.inputForm}`}>
            <textarea
                maxLength="600"
                id='commTextarea'
                onChange={e => setCommentText(e.target.value)}
                value={commentText}
                type="text"
                placeholder={langList?.elements?.commentsPopup?.inputPlaceHolder[lang]}
                onKeyUp={resizeTextareaHandler()}
            />
            <SendButton
                sendMethod={sendMethod}
                commentText={commentText}
                searchParams={searchParams}
                postCommentHandler={postCommentHandler}
                editCommentHandler={editCommentHandler}
                commentIndex={commentIndex}
            />
        </div>
    )
}