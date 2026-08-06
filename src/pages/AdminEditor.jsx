import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { adminStatus, adminLogout, updateSection } from "../api/admin";
import { getContent } from "../api/content";
import {
    Button,
    Card,
    Input,
    Textarea,
    Title,
    Badge,
    SidebarItem,
} from "../components/NeoUI";

const SECTION_LABELS = {
    siteTitle: "Site Title",
    navbar: "Navbar",
    hero: "Hero",
    trust: "Trust / Logos",
    stats: "Stats",
    about: "About",
    services: "Services",
    sectors: "Sectors",
    whyUs: "Why Us",
    network: "Network",
    testimonials: "Testimonials",
    cta: "Call To Action",
    footer: "Footer",
};

function Field({
    label,
    value,
    onChange,
    type = "text",
    multiline = false,
    rows = 3,
}) {
    return (
        <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-neo-black mb-2 border-l-4 border-neo-yellow pl-2">
                {label}
            </label>
            {multiline ? (
                <Textarea
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                />
            ) : (
                <Input
                    type={type}
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
}

function ObjectEditor({ data, onChange, depth = 0 }) {
    if (typeof data !== "object" || data === null) {
        return (
            <Field
                label="Value"
                value={String(data ?? "")}
                onChange={(v) => {
                    try {
                        onChange(JSON.parse(v));
                    } catch {
                        onChange(v);
                    }
                }}
            />
        );
    }

    if (Array.isArray(data)) {
        return (
            <div className="space-y-4">
                {data.map((item, i) => (
                    <div
                        key={i}
                        className="border-2 border-neo-black p-4 bg-neo-bg shadow-neo-sm"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <Badge variant="dark">Item #{i + 1}</Badge>
                            <button
                                onClick={() =>
                                    onChange(data.filter((_, idx) => idx !== i))
                                }
                                className="px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-neo-black bg-neo-red text-white hover:bg-red-700 transition active:translate-x-px active:translate-y-px cursor-pointer"
                            >
                                Remove
                            </button>
                        </div>
                        <ObjectEditor
                            data={item}
                            depth={depth + 1}
                            onChange={(v) => {
                                const next = [...data];
                                next[i] = v;
                                onChange(next);
                            }}
                        />
                    </div>
                ))}
                <button
                    onClick={() => onChange([...data, {}])}
                    className="w-full px-4 py-3 text-xs font-black uppercase tracking-widest border-2 border-neo-black bg-neo-yellow text-neo-black shadow-neo-sm hover:shadow-neo transition active:translate-x-px active:translate-y-px cursor-pointer"
                >
                    + Add item
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => {
                const isPrimitive =
                    typeof value === "string" ||
                    typeof value === "number" ||
                    typeof value === "boolean";
                return (
                    <div key={key}>
                        {isPrimitive ? (
                            <Field
                                label={key}
                                value={String(value)}
                                multiline={
                                    typeof value === "string" &&
                                    value.length > 60
                                }
                                onChange={(v) => {
                                    let parsed = v;
                                    if (typeof value === "number")
                                        parsed = Number(v) || 0;
                                    else if (typeof value === "boolean")
                                        parsed = v === "true";
                                    onChange({ ...data, [key]: parsed });
                                }}
                            />
                        ) : (
                            <details
                                className="border-2 border-neo-black bg-white shadow-neo-sm"
                                open={depth < 1}
                            >
                                <summary className="cursor-pointer select-none px-4 py-3 text-xs font-black uppercase tracking-widest text-neo-black bg-neo-gray/40 hover:bg-neo-yellow transition flex items-center justify-between">
                                    <span>{key}</span>
                                    <span className="text-neo-black/60">▾</span>
                                </summary>
                                <div className="p-4 border-t-2 border-neo-black bg-neo-bg">
                                    <ObjectEditor
                                        data={value}
                                        depth={depth + 1}
                                        onChange={(v) =>
                                            onChange({ ...data, [key]: v })
                                        }
                                    />
                                </div>
                            </details>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function AdminEditor() {
    const [content, setContent] = useState(null);
    const [activeSection, setActiveSection] = useState("hero");
    const [sectionDraft, setSectionDraft] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [authChecked, setAuthChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const status = await adminStatus();
                if (!status || !status.authenticated) {
                    navigate("/admin/login");
                    return;
                }
            } catch {
                navigate("/admin/login");
                return;
            }
            setAuthChecked(true);
            try {
                const data = await getContent();
                setContent(data);
            } catch (e) {
                setMessage("✗ " + e.message);
            }
        })();
    }, [navigate]);

    useEffect(() => {
        if (content && activeSection) {
            if (content?.siteTitle) {
                document.title = content.siteTitle;
            }
            setSectionDraft(
                JSON.parse(JSON.stringify(content[activeSection] ?? {})),
            );
        }
    }, [content, activeSection]);

    const onSave = async () => {
        setSaving(true);
        setMessage("");
        try {
            await updateSection(activeSection, sectionDraft);
            setContent({ ...content, [activeSection]: sectionDraft });
            setMessage("✓ Saved to database");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("✗ " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const onLogout = async () => {
        await adminLogout();
        navigate("/admin/login");
    };

    if (!authChecked || !content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card variant="yellow" className="px-8 py-6">
                    <p className="font-black uppercase tracking-widest text-neo-black">
                        Loading editor...
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neo-bg flex flex-col">
            {/* HEADER */}
            <header className="bg-neo-yellow border-b-4 border-neo-black px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-neo-black">
                        {content.siteTitle} — Admin
                    </h1>
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-neo-black bg-white text-neo-black shadow-neo-sm hover:shadow-neo transition active:translate-x-px active:translate-y-px"
                    >
                        ↗ Preview live site
                    </a>
                </div>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-white bg-white text-neo-black shadow-neo-sm hover:shadow-neo transition active:translate-x-px active:translate-y-px cursor-pointer"
                >
                    Logout
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* SIDEBAR */}
                <aside className="w-64 bg-white border-r-4 border-neo-black overflow-y-auto p-5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-neo-black/60 mb-4 border-b-2 border-neo-black pb-2">
                        Sections
                    </div>
                    {Object.entries(SECTION_LABELS).map(([key, label]) => (
                        <SidebarItem
                            key={key}
                            active={activeSection === key}
                            onClick={() => setActiveSection(key)}
                        >
                            {label}
                        </SidebarItem>
                    ))}
                </aside>

                {/* MAIN */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <Badge variant="dark">Editing</Badge>
                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-neo-black leading-none">
                                    {SECTION_LABELS[activeSection]}
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                {message && (
                                    <span
                                        className={`px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-neo-black ${
                                            message.startsWith("✓")
                                                ? "bg-neo-green text-white"
                                                : "bg-neo-red text-white"
                                        }`}
                                    >
                                        {message}
                                    </span>
                                )}
                                <Button
                                    variant="primary"
                                    onClick={onSave}
                                    disabled={saving}
                                    className="px-5 py-2 text-sm cursor-pointer"
                                >
                                    {saving ? "Saving..." : "Save changes"}
                                </Button>
                            </div>
                        </div>

                        <Card className="p-6 md:p-8">
                            <ObjectEditor
                                data={sectionDraft ?? {}}
                                onChange={setSectionDraft}
                            />
                        </Card>

                        <div className="mt-6 border-2 border-neo-black bg-neo-blue text-white p-5 shadow-neo">
                            <div className="flex items-start gap-3">
                                <Badge variant="yellow">Heads up</Badge>
                                <p className="text-sm font-medium leading-relaxed">
                                    Changes are saved to the D1 database
                                    immediately. Refresh the{" "}
                                    <a
                                        href="/"
                                        className="underline font-black uppercase tracking-wider"
                                    >
                                        homepage
                                    </a>{" "}
                                    to see them live.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
