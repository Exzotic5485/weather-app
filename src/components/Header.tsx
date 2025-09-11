import Logo from "@/components/logo";
import { Link } from "@tanstack/react-router";

export function Header() {
    return (
        <header className="wrapper pt-12 flex items-center justify-between">
            <Link to="/">
                <Logo />
            </Link>
        </header>
    );
}
