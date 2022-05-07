import { Loader } from "../../Loader"
import classes from "./GeneralPanel.module.css"
import { memo } from "react"
import { useUser } from "../../../hooks/user.hook"

export const GeneralPanel = memo(({ generalInfo }) => {

    const { ready } = useUser()

    if (!ready) {
        return <Loader />
    }

    return (
        <div className={`borderRadius ${classes.generalInformationPanel}`}>
            <h2 className="center">General information</h2>
            <div className={classes.generalInformationTableOuter}>
                {
                    generalInfo
                        ?
                        <table className={classes.generalInformationTable}>
                            <tbody>
                                <tr><td>Amount users</td><th>{generalInfo.amountUsers}</th></tr>
                                <tr><td>Amount posts</td><th>{generalInfo.amountPosts}</th></tr>
                            </tbody>
                        </table>
                        :
                        "No info"
                }
            </div>
        </div>
    )
})