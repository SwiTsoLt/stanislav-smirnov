import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { usePosts } from "../hooks/posts.hook"
import classes from '../styles/pages/News.module.css'
import { Post } from "../elements/Post"
import { Loader } from "../elements/Loader"
import { useUser } from "../hooks/user.hook"

export const News = () => {

    const [posts, setPosts] = useState()

    const { ready, setReady } = useUser()
    const { getPosts } = usePosts()
    const { userState } = useUser()

    useEffect(() => {
        let cleanupFunction = false
        const getPostsList = async () => {
            setReady(false)
            const postsList = await getPosts(1)
            if (!cleanupFunction) setPosts(postsList)
            setReady(true)
        }
        getPostsList() 
        return () => cleanupFunction = true
    }, [])

    if (!ready) {
        return <Loader />
    }

    return (
        <div className={classes.newsPage}>
            { ready && posts && posts.map(post => {
                return (
                    <Post
                        post={post}
                        userId={userState?.userId || null}
                        key={post._id}
                    >
                    </Post>
                )
            })}
        </div>
    )
}