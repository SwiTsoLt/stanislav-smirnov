import React from 'react';
import { useLang } from '../hooks/lang.hook';
import classes from '../styles/elements/Search.module.css'

export const Search = ({ asideProps }) => {

    const { langList } = useLang()

    return (
        <div className={`search ${classes.search}`}>
            <input id='search_input' className="borderRadius" type="text" placeholder={langList.elements.search.inputPlaceHolder[asideProps.lang]} />
            <button id='search_button' className="borderRadius"></button>
        </div>
    )
}