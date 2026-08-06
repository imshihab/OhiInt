import { useEffect, useState } from "react";

async function getContent() {
    const res = await fetch("/api/read");

    if (!res.ok) throw new Error("Failed to load");

    return res.json();
}

export function useContent() {
    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getContent()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    return {
        data,
        loading,
    };
}
