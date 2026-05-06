import { Button } from "@/components/ui/button";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Browse Event", active: true },
  { href: "/features", label: "Features" },
  { href: "/schedule", label: "Schedule" },
];

export default function NavBar() {
  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto w-full justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-xl tracking-tight mr-6">
            EventApp
          </Link>
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  link.active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}