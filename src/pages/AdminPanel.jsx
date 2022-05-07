import { useState, useEffect } from "react"
import { CreatePostForm } from "../elements/adminPanelElements/createPostForm/CreatePostForm"
import { GeneralPanel } from "../elements/adminPanelElements/GeneralPanel/GeneralPanel"
import { PostsPanel } from "../elements/adminPanelElements/PostsPanel/PostsPanel"
import { UsersPanel } from "../elements/adminPanelElements/UsersPanel/UsersPanel"
import { useAdminPanel } from "../hooks/adminPanel.hook"
import { useMessage } from "../hooks/message.hook"
import { usePosts } from "../hooks/posts.hook"
import { useUser } from "../hooks/user.hook"
import classes from "../styles/pages/AdminPanel.module.css"

export const AdminPanel = () => {

    const [isAccess, setIsAccess] = useState(false)
    const [generalInfo, setGeneralInfo] = useState({
        amountUsers: 0,
        amountPosts: 0
    })
    const [usersPage, setUsersPage] = useState(1)
    const [postsPage, setPostsPage] = useState(1)
    const [usersList, setUsersList] = useState([])
    const [postsList, setPostsList] = useState([])
    const [sendMethod, setSendMethod] = useState("postComment")

    const { getGeneralStatistic } = useAdminPanel()
    const { getPosts } = usePosts()
    const message = useMessage()
    const { getUsers, ready, userState } = useUser()

    const getGeneralInfo = async () => {
        const { amountUsers, amountPosts } = await getGeneralStatistic()
        setGeneralInfo({ amountUsers, amountPosts })
    }

    const getPostsInfo = async (page) => {
        const postsData = await getPosts(page)
        if (postsData) {
            return setPostsList(postsData)
        }
        return message("Something went wrong")
    }

    const getUsersInfo = async (page) => {
        const data = await getUsers(page)

        if (data && data.errors) {
            message(data.errors)
            return false
        }
        if (data && data.users) {
            getGeneralInfo()
            getPostsInfo(postsPage)
            setIsAccess(true)
            return setUsersList(data.users)
        }
        message("Something went wrong")
        return false
    }

    const nextUsersInfoPage = async () => {
        await getUsersInfo(usersPage + 1)
        setUsersPage(usersPage + 1)

    }

    const prevUsersInfoPage = async () => {
        await getUsersInfo(usersPage - 1)
        setUsersPage(usersPage - 1)

    }

    const nextPostsInfoPage = async () => {
        await getPostsInfo(postsPage + 1)
        setPostsPage(postsPage + 1)

    }

    const prevPostsInfoPage = async () => {
        await getPostsInfo(postsPage - 1)
        setPostsPage(postsPage - 1)

    }

    useEffect(() => {
        if (ready && userState) {
            let cleanupFunction = false
            if (!cleanupFunction) {
                getUsersInfo(usersPage)
            }
            return () => cleanupFunction = true
        }
    }, [ready])

    if (!isAccess) {
        return (
            <div className={classes.noAccess}>
                <h1>No access</h1>
            </div>
        )
    }

    return (
        <div className={classes.adminPanel}>
            <h1 className={`borderRadius center ${classes.adminPanelTitle}`}>Admin panel</h1>
            <CreatePostForm
                getGeneralInfo={getGeneralInfo}
                setPostsList={setPostsList}
            />
            <GeneralPanel generalInfo={generalInfo} />
            <UsersPanel
                generalInfo={generalInfo}
                usersPage={usersPage}
                usersList={usersList}
                getGeneralInfo={getGeneralInfo}
                getUsersInfo={getUsersInfo}
                prevUsersInfoPage={prevUsersInfoPage}
                nextUsersInfoPage={nextUsersInfoPage}
            />
            <PostsPanel
                getGeneralInfo={getGeneralInfo}
                getPostsInfo={getPostsInfo}
                generalInfo={generalInfo}
                postsPage={postsPage}
                postsList={postsList}
                prevPostsInfoPage={prevPostsInfoPage}
                nextPostsInfoPage={nextPostsInfoPage}
                sendMethod={sendMethod}
                setSendMethod={setSendMethod}
            />

        </div>
    )
}