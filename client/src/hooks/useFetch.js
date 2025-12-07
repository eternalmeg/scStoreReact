import { useEffect, useState } from "react";
import useRequest from "./useRequest";

export default function useFetch(url) {
    const request = useRequest();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        request(url)
            .then(result => setData(result))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));

    }, [url]);

    return {
        data,
        loading,
        error,
        setData
    };
}
