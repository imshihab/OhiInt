import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminEditor from "./pages/AdminEditor";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/admin" element={<AdminEditor />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
