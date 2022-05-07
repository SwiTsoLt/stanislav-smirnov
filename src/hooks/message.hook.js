import { useCallback } from "react"

export const useMessage = () => {
    return useCallback(( text, isSuccess = false) => {
        if (window.M && text) {
            window.M.toast({
                html: text, 
                classes: `rounded ${isSuccess ? 'colorToastSuccess' : 'colorToastError'}`
            })
        }
    }, [])
}