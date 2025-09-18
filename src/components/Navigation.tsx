import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Brands", path: "/brands" },
    { name: "Photography", path: "/photography" }
  ];

  return (
    <header className="w-full flex justify-between items-center p-6 md:p-8 relative">
      <div className="flex items-center space-x-2">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">William Armstrong</h1>
            <p className="text-muted-foreground text-sm md:text-base">Engineer & Entrepreneur</p>
          </div>
        </Link>
      </div>

      <nav className="hidden md:flex items-center bg-nav backdrop-blur-md border border-nav-border rounded-full px-2 py-2 fixed left-1/2 transform -translate-x-1/2 top-6 z-50">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <Button
              variant="nav"
              size="sm"
              className={`mx-1 ${location.pathname === item.path ? 'text-nav-active' : ''}`}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Link to="/contact">
          <Button variant="connect" size="default">
            Connect
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navigation;