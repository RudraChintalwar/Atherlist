
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="w-8 h-8 rounded-full bg-cosmic-purple glow-effect flex items-center justify-center"
            >
              <span className="text-lg font-bold">⚛</span>
            </motion.div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-cosmic-gradient"
            >
              AetherList
            </motion.h1>
          </Link>
          
          <nav>
            <ul className="flex items-center gap-6">
              <NavItem href="/dashboard" label="Dashboard" />
              <NavItem href="/tasks" label="Tasks" />
              <NavItem href="/focus" label="Focus" />
              <li>
                <Button 
                  variant="outline" 
                  className={cn(
                    "border border-cosmic-purple/50 text-white",
                    "hover:border-cosmic-purple/80 hover:bg-cosmic-purple/10",
                    "transition-all duration-300"
                  )}
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link 
        to={href}
        className="relative text-white/80 hover:text-white transition-colors duration-300 py-2"
      >
        <span>{label}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cosmic-purple transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </li>
  );
}
