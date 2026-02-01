import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureCard } from '../components/FeatureCard';
import { Coins, Shield, Zap, Clock, Lock, FileCheck } from 'lucide-react';

const features = [
  {
    icon: Coins,
    title: 'No Coding Required',
    description: 'Create ERC20 tokens with an intuitive interface. No smart contract knowledge needed.',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'All token contracts are audited and follow best practices for secure token deployment.',
  },
  {
    icon: Zap,
    title: 'Instant Deployment',
    description: 'Deploy your token in under a minute with optimized gas usage across all networks.',
  },
  {
    icon: Clock,
    title: 'Advanced Features',
    description: 'Enable minting, burning, pausing, governance, and more with simple toggles.',
  },
  {
    icon: Lock,
    title: 'Multi-Chain Support',
    description: 'Deploy on Ethereum, Polygon, Arbitrum, Base, and other supported networks.',
  },
  {
    icon: FileCheck,
    title: 'Verified Contracts',
    description: 'All deployed contracts are automatically verified on block explorers.',
  },
];

export const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ERC20Gen?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The most comprehensive and user-friendly platform for creating ERC20 tokens
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Token?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who have launched their tokens with ERC20Gen
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/create"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Creating
            </a>
            <a
              href="/explore"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore Tokens
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Tokens Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$50M+</div>
              <div className="text-gray-600">Total Market Cap</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
