import React from "react";
import classes from '../styles/elements/Loader.module.css'

export const Loader = () => {
    return (
        <div className={classes.loader}>
            <div className={classes.loader_circle}></div>
        </div>
    )
}  