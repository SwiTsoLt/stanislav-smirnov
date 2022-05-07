import { memo } from 'react';
import classes from './MyButton.module.css';

export const MyButton = memo(({ text, type, functionHandler }) => {

    return (
        <button
            className={`${classes.myButton} ${classes[type]}`}
            onClick={() => functionHandler()}
        >
            {text}
        </button>
    )
})