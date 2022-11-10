import { useEffect, useState } from "react"

export const useGeolocation = () => {
    const [geolocation, setGeolocation] = useState();

    useEffect(() => {
        if(typeof navigator === "object") {
            setGeolocation(navigator.geolocation);
        }
    }, []);

    return {
        geolocation
    }
}