import { useState } from "react";
import { useNavigate } from "react-router";
import { adminLogin } from "../api/admin";
import { Button, Card, Input, Title, Subtitle } from "../components/NeoUI";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await adminLogin(username, password);
            navigate("/admin");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neo-bg flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-lg">
                {/* Header strip */}
                <div className="mb-6 flex items-center justify-center gap-3">
                    <div className="px-4 py-2 border-2 border-neo-black bg-neo-red text-white shadow-neo-sm">
                        <span className="text-xs font-black uppercase tracking-widest">
                            Admin Access
                        </span>
                    </div>
                </div>

                <Card className="p-8 md:p-10">
                    <div className="mb-8 border-b-4 border-neo-black pb-4">
                        <Title>Admin</Title>
                        <Title className="text-neo-yellow bg-neo-black inline-block px-2 mt-1">
                            Login
                        </Title>
                        <Subtitle className="uppercase tracking-widest text-xs font-bold mt-3 border-l-4 border-neo-black pl-2">
                            Sign in to edit your landing page
                        </Subtitle>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-neo-black mb-2 border-l-4 border-neo-yellow pl-2">
                                Username
                            </label>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="admin"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-neo-black mb-2 border-l-4 border-neo-yellow pl-2">
                                Password
                            </label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="px-4 py-3 text-sm font-bold text-white bg-neo-red border-2 border-neo-black shadow-neo-sm uppercase tracking-wider">
                                ✗ {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="w-full mt-4"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    <div className="mt-6 pt-4 border-t-2 border-neo-black text-center">
                        <a
                            href="/"
                            className="inline-block px-4 py-2 text-xs font-black uppercase tracking-widest text-neo-black border-2 border-neo-black bg-white shadow-neo-sm hover:shadow-neo hover:bg-neo-yellow transition active:translate-x-px active:translate-y-px"
                        >
                            ← Back to site
                        </a>
                    </div>
                </Card>
            </div>
        </div>
    );
}
