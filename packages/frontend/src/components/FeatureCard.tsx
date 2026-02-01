import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative rounded-2xl border border-theme-primary bg-theme-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-500/30">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-theme-primary">{title}</h3>
        <p className="text-sm leading-relaxed text-theme-secondary">{description}</p>
      </div>
    </div>
  );
};
