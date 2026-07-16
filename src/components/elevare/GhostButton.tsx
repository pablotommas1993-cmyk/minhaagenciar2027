import { Play } from 'lucide-react';

interface GhostButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export default function GhostButton({
  children = 'Ver Portfólio',
  onClick,
  icon,
}: GhostButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md px-8 py-4 font-medium text-white hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300 cursor-pointer"
    >
      <span className="flex items-center gap-2 text-sm">
        {icon || (
          <Play size={14} className="text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" />
        )}
        {children}
      </span>
    </button>
  );
}
