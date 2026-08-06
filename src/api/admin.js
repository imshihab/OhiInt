async function jsonRequest(url, options = {}) {
    const res = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
    }
    return data;
}

export const adminLogin = (username, password) =>
    jsonRequest("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });

export const adminLogout = () =>
    jsonRequest("/api/logout", { method: "POST" });

export const adminStatus = () =>
    jsonRequest("/api/update", { method: "GET" });

export const updateSection = (section, data) =>
    jsonRequest("/api/update", {
        method: "POST",
        body: JSON.stringify({ section, data }),
    });