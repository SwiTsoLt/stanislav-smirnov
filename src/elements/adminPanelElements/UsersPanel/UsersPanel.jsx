import { Loader } from "../../Loader"
import classes from "./UsersPanel.module.css"
import { memo, useEffect, useState } from "react"
import { UsersPanelUser } from "./elements/UsersPanelUser"
import { useUser } from "../../../hooks/user.hook"

export const UsersPanel = memo(({
    generalInfo, usersPage, usersList,
    prevUsersInfoPage, nextUsersInfoPage,
    getUsersInfo
}) => {

    const [searchLimit, setSearchLimit] = useState(5)

    const { ready } = useUser()

    useEffect(() => {
        if (ready && usersPage === 1) setSearchLimit(usersList.length)
    }, [])

    if (!ready) {
        return <Loader />
    }

    return (
        <div className={`borderRadius ${classes.usersPanel}`}>
            <h2 className="center">Users information <span>(Page: {usersPage}/{Math.ceil(generalInfo.amountUsers / searchLimit)})</span></h2>
            <div className={classes.usersList}>
                {
                    (ready && usersPage > 1)
                    &&
                    <div className={classes.nextUsers}>
                        <button
                            className={classes.prevUsersButton}
                            onClick={() => prevUsersInfoPage()}
                        ></button>
                    </div>
                }
                {
                    usersList.length
                    ? usersList.map(user => {
                        return (
                            <UsersPanelUser
                                key={user._id}
                                user={user}
                                getUsersInfo={getUsersInfo}
                                usersPage={usersPage}
                            />
                        )
                    })

                    : <h2 className={classes.center}>There are no users yet</h2>
                }
                {
                    (ready && searchLimit < (generalInfo.amountUsers - (usersPage - 1) * searchLimit)) &&
                    <div className={classes.nextUsers}>
                        <button
                            className={classes.nextUsersButton}
                            onClick={() => nextUsersInfoPage()}
                        ></button>
                    </div>
                }
            </div>
        </div>
    )
})