import React from 'react';
import { Hero } from '../components/Hero';
import { Coins, Shield, Zap, Clock, Lock, FileCheck, ArrowRight, Play, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Zap,
    title: 'Instant Deployment',
    description: 'Deploy your token in under 60 seconds with gas-optimized contracts.',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'All contracts are audited and follow OpenZeppelin best practices.',
  },
  {
    icon: Clock,
    title: 'Advanced Features',
    description: 'Enable minting, burning, pausing, and governance controls easily.',
  },
  {
    icon: Lock,
    title: 'Multi-Chain Support',
    description: 'Deploy on Ethereum, Polygon, Arbitrum, Base, and more.',
  },
  {
    icon: FileCheck,
    title: 'Auto Verification',
    description: 'Contracts are automatically verified on block explorers.',
  },
  {
    icon: Coins,
    title: 'No Code Required',
    description: 'Create professional tokens without writing a single line of code.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Connect Wallet',
    description: 'Connect your Web3 wallet and select your preferred network.',
  },
  {
    number: '02',
    title: 'Configure Token',
    description: 'Set your token name, symbol, supply, and optional features.',
  },
  {
    number: '03',
    title: 'Deploy',
    description: 'Review and deploy your token with one click.',
  },
];

export const Home: React.FC = () => {
  return (
    <div className="bg-theme-primary">
      <Hero />
      
      {/* Features Section */}
      <section className="relative w-full py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-secondary/50 to-transparent" />
        
        <div className="section-container relative">
          <div className="mb-16 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-400">
              <Zap className="h-4 w-4" />
              Features
            </span>
            <h2 className="mb-6 text-3xl font-bold text-theme-primary sm:text-4xl lg:text-5xl">
              Everything you need to
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-400"> launch tokens</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-theme-secondary">
              Professional-grade tools for creating and managing ERC20 tokens
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-theme-primary bg-theme-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-500/30 sm:p-8"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 transition-transform duration-300 group-hover:scale-110 sm:mb-6">
                    <feature.icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-theme-primary sm:text-xl">{feature.title}</h3>
                  <p className="text-theme-secondary">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative w-full py-24 lg:py-32">
        <div className="absolute inset-0 bg-theme-secondary/30" />
        
        <div className="section-container relative">
          <div className="mb-16 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-700 dark:border-secondary-500/20 dark:bg-secondary-500/10 dark:text-secondary-400">
              <Play className="h-4 w-4" />
              How It Works
            </span>
            <h2 className="mb-6 text-3xl font-bold text-theme-primary sm:text-4xl lg:text-5xl">
              Create tokens in
              <span className="bg-gradient-to-r from-secondary-600 to-pink-600 bg-clip-text text-transparent dark:from-secondary-400 dark:to-pink-400"> 3 simple steps</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-2 -top-4 select-none text-6xl font-bold text-theme-secondary sm:text-7xl md:text-8xl">
                  {step.number}
                </div>
                <div className="relative pt-6">
                  <h3 className="mb-3 text-xl font-bold text-theme-primary sm:text-2xl">{step.title}</h3>
                  <p className="text-theme-secondary sm:text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-secondary-600/10 to-pink-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
        
        <div className="section-container relative text-center">
          <h2 className="mb-6 text-3xl font-bold text-theme-primary sm:text-4xl lg:text-5xl">
            Ready to launch your token?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-theme-secondary sm:text-xl">
            Join thousands of creators who have successfully deployed their tokens with ERC20Gen
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/create"
              className="group inline-flex items-center gap-2 rounded-xl bg-theme-primary px-6 py-3 text-base font-semibold text-primary-700 shadow-xl transition-all duration-200 hover:bg-theme-secondary dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 sm:px-8 sm:py-4"
            >
              Start Creating
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-xl border border-theme-primary bg-theme-card px-6 py-3 text-base font-semibold text-theme-secondary transition-all duration-200 hover:border-theme-secondary hover:text-theme-primary sm:px-8 sm:py-4"
            >
              Explore Tokens
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 border-t border-theme-primary pt-12">
            <div className="flex flex-wrap items-center justify-center gap-6 text-theme-muted sm:gap-8">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" />
                <span>No registration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" />
                <span>Open source</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full border-t border-theme-primary py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent sm:text-4xl lg:text-5xl dark:from-primary-400 dark:to-secondary-400">
                10K+
              </div>
              <div className="text-theme-muted">Tokens Created</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold bg-gradient-to-r from-secondary-600 to-pink-600 bg-clip-text text-transparent sm:text-4xl lg:text-5xl dark:from-secondary-400 dark:to-pink-400">
                $50M+
              </div>
              <div className="text-theme-muted">Market Cap</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent sm:text-4xl lg:text-5xl dark:from-pink-400 dark:to-rose-400">
                5K+
              </div>
              <div className="text-theme-muted">Active Users</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent sm:text-4xl lg:text-5xl dark:from-rose-400 dark:to-orange-400">
                99%
              </div>
              <div className="text-theme-muted">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
