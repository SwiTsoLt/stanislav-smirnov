import { memo, useEffect, useState } from "react";
import { useUser } from "../hooks/user.hook";
import { ErrorAvatar } from "./ErrorAvatar";
import { Loader } from "./Loader";

export const Img = memo(({ imageName, imageType }) => {
    const [url, setUrl] = useState('')

    const { ready } = useUser()

    useEffect(() => {
        let cleanupFunction = false;

        const getPostImage = async () => {
            const response = await fetch(`api/posts/getPostImage/${imageName}`)
            if (response.ok) {
                const postImage = await response.blob()
                if (!cleanupFunction) {
                    setUrl(URL.createObjectURL(postImage))
                }
            }
            else {
                return <ErrorAvatar />
            }

        }

        const getUserAvatar = async () => {
            const response = await fetch(`api/fs/getUserAvatar/${imageName}`)
            if (response.ok) {
                const postImage = await response.blob()
                if (!cleanupFunction) {
                    setUrl(URL.createObjectURL(postImage))
                }
            }
            else {
                return <ErrorAvatar />
            }
        }

        if (imageName && imageType === "post") {
            getPostImage()
        }
        else if (imageName && imageType === "userAvatar") {
            getUserAvatar()
        }

        return () => cleanupFunction = true
    }, [ready, imageName])

    if (!url && imageType === "post") {
        return <div className="imagePreloader"><Loader /></div>
    }

    if (url) {
        return <img src={url} />;
    }
    return <ErrorAvatar />
})