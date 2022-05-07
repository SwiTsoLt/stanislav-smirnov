import { useMessage } from "./message.hook"
import axios from 'axios';

export const usePosts = () => {

    const message = useMessage()

    const getPosts = async (page) => {
        const url = `api/posts/getPage/${page}`
        try {
            const response = await fetch(url)
            const data = await response.json()
            if (response.ok) {
                return data.posts
            }

            data.errors.forEach(error => {
                message(error.message, false)
            })
            return false
        } catch (e) {
            console.log(e);
            message("Something went wrong", false)
            return false
        }
    }

    const createPost = async (postTitle, postBody, file) => {
        const data = JSON.parse(localStorage.getItem("DataStorage"))
        if (postTitle && postTitle.trim()) {
            try {
                const formData = new FormData()
                formData.append('file', file)

                const url = `api/posts/createPost?postTitle=${postTitle}&postBody=${postBody}`
                const options = {
                    method: "get",
                    headers: {
                        "authorization": `Bearer ${data.token}`
                    }
                }
                const response = await axios.post(url, formData, options)
                console.log(response);
                if (
                    response && response.data &&
                    response.statusText === "Created" && response.data.message
                ) {
                    message(response.data.message, true)
                    return true
                }
                if (
                    response && response.data &&
                    response.data.errors
                ) {
                    response.data.errors.foreEach(error => {
                        message(error.message, false)
                    })
                    return false
                }
                message("Something went wrong", false)
                return false
            } catch (e) {
                console.log(e);
                message("Something went wrong", false)
                return false
            }
        }
        message("Title can not be empty", false)
        return false
    }

    const deletePost = async (postId) => {
        if (postId) {
            const data = JSON.parse(localStorage.getItem("DataStorage"))

            const url = `api/posts/deletePost?postId=${postId}`
            const options = {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${data.token}`
                }
            }

            try {
                const response = await fetch(url, options)
                const dataPost = await response.json()
                if (response.ok && dataPost && dataPost.message) {
                    message(dataPost.message, true)
                    return true
                }
                if (dataPost && dataPost.errors) {
                    dataPost.errors.forEach(error => {
                        message(error.message, false)
                    })
                    return false
                }
                message("Something went wrong", false)
                return false
            } catch (e) {
                console.log(e);
                message("Something went wrong", false)
                return false
            }
        }
        message("Post not found", false)
        return false
    }

    const editPost = async (newPost) => {
        const data = JSON.parse(localStorage.getItem("DataStorage"))

        const url = `api/posts/editPost`
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${data.token}`
            },
            body: JSON.stringify({ newPost }),
        }
        try {
            const response = await fetch(url, options)
            const dataNewPost = await response.json()
            if (response.ok && dataNewPost && dataNewPost.message) {
                message(dataNewPost.message, true)
                return true
            }
            if (dataNewPost && dataNewPost.errors) {
                dataNewPost.errors.forEach(error => {
                    message(error.message, false)
                })
                return false
            }
            message("Something went wrong", false)
            return false
        } catch (e) {
            console.log(e);
            message("Something went wrong", false)
        }
    }

    const likesUpdate = async (postId) => {
        try {
            const data = JSON.parse(localStorage.getItem("DataStorage"))

            if (data && data.token) {
                const url = `api/posts/likesUpdate`
                const options = {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${data.token}`
                    },
                    body: JSON.stringify({ postId })
                }

                const response = await fetch(url, options)
                const dataLikes = await response.json()
                if (response.ok && (dataLikes.enter === true || dataLikes.enter === false)) {
                    return { enter: !!dataLikes.enter }
                }

                if (dataLikes && dataLikes.errors) {
                    dataLikes.errors.forEach(error => {
                        message(error.message, false)
                    })
                    return false
                }
                message("Something went wrong", false)
                return false
            }

            message("User not authorized", false)
            return false

        } catch (e) {
            console.log(e);
            message("Something went wrong", false)
            return false
        }
    }

    const postComment = async (text, postId) => {
        const data = JSON.parse(localStorage.getItem("DataStorage"))

        const url = `api/posts/postComment`
        const options = {
            method: 'post',
            headers: {
                "authorization": `Bearer ${data.token}`
            },
            body: JSON.stringify({ text, postId })
        }
        try {
            const response = await fetch(url, options)
            const dataComment = await response.json()
            if (response.ok && dataComment && dataComment.message) {
                message(dataComment.message, true)
                return true
            }

            if (dataComment && dataComment.errors) {
                dataComment.errors.forEach(error => {
                    message(error.message, false)
                })
                return false
            }

        } catch (e) {
            console.log(e);
            return false
        }
    }

    const getComments = async (postId) => {
        const data = JSON.parse(localStorage.getItem("DataStorage"))

        const url = `api/posts/getComments?postId=${postId}`
        const options = {
            "method": "get",
            "headers": {
                "authorization": `Bearer ${data.token}`
            }
        }
        try {
            const response = await fetch(url, options)
            const dataComment = await response.json()
            if (response.ok) {
                return dataComment.commentsList
            }
            if (dataComment && dataComment.errors) {
                dataComment.errors.forEach(error => {
                    message(error.message, false)
                })
                return false
            }
            message("Something went wrong", false)
            return false
        } catch (e) {
            console.log(e);
            message("Something went wrong", false)
            return false
        }
    }

    const deleteComment = async (postId, commentIndex) => {
        const data = JSON.parse(localStorage.getItem("DataStorage"))

        const url = `api/posts/deleteComment?postId=${postId}&commentIndex=${commentIndex}`
        const options = {
            "method": "get",
            "headers": {
                "authorization": `Bearer ${data?.token}`
            }
        }

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                return true
            }
            const deleteData = await response.json()
            if (deleteData && deleteData.errors) {
                return message(deleteData.errors, false)
            }
        } catch (e) {
            console.log(e);
            message("Something went wrong", false)
            return false
        }
    }

    const editComment = async (postId, commentIndex, commentText) => {
        const data = JSON.parse(localStorage.getItem("DataStorage"))

        const url = `api/posts/editComment?postId=${postId}&commentIndex=${commentIndex}&commentText=${commentText}`
        const options = {
            "method": "get",
            "headers": {
                "authorization": `Bearer ${data?.token}`
            }
        }

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                return true
            }
            const editData = await response.json()
            if (editData && editData.errors) {
                editData.errors.forEach(error => {
                    message(error.message, false)
                })
                return false
            }
        } catch (e) {
            console.log(e);
            message("Something went wrong", false)
            return false
        }
    }

    return {
        getPosts, createPost, deletePost, editPost, likesUpdate,
        postComment, getComments, deleteComment, editComment
    }

}