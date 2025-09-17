import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navItems = ["About", "Projects", "Brands", "Photography"];

  return (
    <header className="w-full flex justify-between items-center p-6 md:p-8">
      <div className="flex items-center space-x-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">William Armstrong</h1>
          <p className="text-muted-foreground text-sm md:text-base">Engineer & Entrepreneur</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center bg-nav rounded-full px-2 py-2 shadow-sm">
        {navItems.map((item) => (
          <Button
            key={item}
            variant="nav"
            size="sm"
            className="mx-1"
          >
            {item}
          </Button>
        ))}
      </nav>

      <Button variant="connect" size="default">
        Connect
      </Button>
    </header>
  );
};

export default Navigation;