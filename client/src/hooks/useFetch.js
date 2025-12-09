import { useEffect, useState } from "react";

export default function useFetch(asyncCallback, dependencies = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isActive = true;

        setLoading(true);

        asyncCallback()
            .then(result => {
                if (isActive) setData(result);
            })
            .catch(err => {
                if (isActive) setError(err);
            })
            .finally(() => {
                if (isActive) setLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, dependencies);

    return { data, setData, loading, error };
}
