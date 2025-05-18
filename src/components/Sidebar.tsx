
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  CheckSquare, 
  LayoutDashboard, 
  Focus
} from 'lucide-react';

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <CheckSquare size={20} />, label: 'Tasks', href: '/tasks' },
  { icon: <Focus size={20} />, label: 'Focus', href: '/focus' },
];

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-64 fixed left-0 top-0 bottom-0 bg-sidebar py-8 border-r border-white/10 z-40"
    >
      <div className="px-6 mb-8">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 rounded-full bg-cosmic-purple shadow-cosmic flex items-center justify-center"
            animate={{ 
              boxShadow: ['0 0 15px rgba(139, 92, 246, 0.5)', '0 0 25px rgba(139, 92, 246, 0.8)', '0 0 15px rgba(139, 92, 246, 0.5)'] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <span className="text-lg font-bold">⚛</span>
          </motion.div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-cosmic-gradient">
            AetherList
          </h1>
        </Link>
      </div>
      
      <nav>
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-cosmic-purple/20 text-white" 
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span 
                    className={cn(
                      "transition-all duration-300",
                      isActive && "text-cosmic-purple"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute right-0 top-1/2 h-5 w-1 bg-cosmic-purple rounded-l-full transform -translate-y-1/2"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className="glass p-4 rounded-lg text-center">
          <p className="text-sm text-white/70 mb-2">Universe of Tasks</p>
          <p className="text-xs text-white/50">AetherList v1.0</p>
        </div>
      </div>
    </motion.aside>
  );
}
