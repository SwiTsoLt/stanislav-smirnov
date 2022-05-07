import React, { useEffect } from "react"
import { useUser } from "../hooks/user.hook"
import { CustomRouter } from '../routes'

export const Main = ({ asideProps, setAsideProps }) => {

    const { ready, userState } = useUser()

    useEffect(() => {
        if (ready) {
            setAsideProps({
                ...asideProps,
                isAuth: !!userState?.userId,
                roles: userState?.userRoles
            })
        }
    }, [userState, ready])

    return (
        <main>
            <CustomRouter asideProps={asideProps} setAsideProps={setAsideProps} />
        </main>
    )
}