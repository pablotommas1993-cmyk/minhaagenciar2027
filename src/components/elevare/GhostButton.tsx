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
      className="group relative overflow-hidden rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md px-8 py-4 font-medium text-white hover:border-white/20 hover:bg-white/[0.04] shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)] luxury-transition cursor-pointer"
    >
      <span className="absolute inset-0 brushed-metal opacity-0 group-hover:opacity-100 luxury-transition pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2 text-sm">
        {icon || (
          <Play size={14} className="text-[#D4AF37] luxury-transition group-hover:scale-110" />
        )}
        {children}
      </span>
    </button>
  );
}
