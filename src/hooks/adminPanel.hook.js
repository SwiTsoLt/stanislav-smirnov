import { useMessage } from "./message.hook"


export const useAdminPanel = () => {

    const message = useMessage()

    const getGeneralStatistic = async () => {
        const data = JSON.parse(localStorage.getItem("DataStorage"))
       
        const url = "api/statistic/getGeneralStatistic"
        const options = {
            "method": "get",
            "headers": {
                "authorization": `Bearer ${data?.token}`
            }
        }

        const response = await fetch(url, options)
        const statisticData = await response.json()

        if (statisticData && statisticData.errors) {
            return message(statisticData.errors, false)
        }
        if (statisticData && statisticData.data) {
            return { 
                amountUsers: statisticData.data.amountUsers,
                amountPosts: statisticData.data.amountPosts
            }
        }
        return message("Something went wrong when fetching statistic")
    }

    return { getGeneralStatistic }
}