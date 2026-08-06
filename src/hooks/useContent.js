import { useEffect, useState } from "react";
import { get, set as lsSet, has } from "esmls";

const CACHE_KEY = "siteContent";

async function getContent() {
    const res = await fetch("/api/read");

    if (!res.ok) throw new Error(`Failed to load: ${res.status} ${res.statusText}`);

    return res.json();
}

export function useContent() {
    // esmls returns `null` when the key doesn't exist (not `undefined`).
    // `has()` is the proper way to know if a cache entry exists.
    const hasCache = has(CACHE_KEY);

    const [data, setData] = useState(() => (hasCache ? get(CACHE_KEY) : null));
    const [loading, setLoading] = useState(!hasCache);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function refresh() {
            try {
                const fresh = await getContent();

                if (cancelled) return;

                // Persist to localStorage for next visit.
                lsSet(CACHE_KEY, fresh);

                setData(fresh);
                setError(null);
            } catch (err) {
                // Network/server failed: keep whatever cache we have.
                if (!cancelled) {
                    console.error("Background content refresh failed:", err);
                    setError(err.message || "Failed to refresh content");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        refresh();

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        data,
        loading,
        error,
    };
}