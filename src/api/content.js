export async function getContent() {
    const res = await fetch("/api/read");

    if (!res.ok) throw new Error("Failed to load");

    return res.json();
}
