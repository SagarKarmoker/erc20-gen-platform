import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Zap, Coins, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-theme-primary">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-secondary-600/5 to-primary-600/10 dark:from-primary-600/12 dark:via-purple-600/6 dark:to-blue-600/8" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-primary-500/10 rounded-full blur-3xl dark:bg-primary-500/12" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-secondary-500/10 rounded-full blur-3xl dark:bg-secondary-500/12" />
      </div>

      {/* Content Container */}
      <div className="section-container relative">
        <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary-200 bg-primary-100 px-4 py-2 dark:border-primary-500/20 dark:bg-primary-500/10">
              <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">No coding required</span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-theme-primary sm:text-5xl lg:text-6xl">
              Create
              <span className="mt-2 block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400">
                ERC20 Tokens
              </span>
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-xl text-lg text-theme-secondary">
              Deploy secure, audited ERC20 tokens with advanced features in minutes. No smart contract knowledge needed.
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/create"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-200 hover:from-primary-500 hover:to-secondary-500 hover:shadow-primary-500/40 hover:-translate-y-0.5"
              >
                Create Token
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/explore"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-theme-primary bg-theme-card px-6 py-3 text-base font-semibold text-theme-primary transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-slate-800"
              >
                Explore Tokens
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-theme-muted">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span>10,000+ Tokens Created</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" style={{ animationDelay: '0.5s' }} />
                <span>5,000+ Active Users</span>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="relative flex items-center justify-center">
            <div className="grid w-full max-w-lg grid-cols-2 gap-4">
              
              {/* Card 1 */}
              <div className="group relative rounded-2xl border border-theme-primary bg-theme-card p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-500/30">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 shadow-lg shadow-primary-500/20">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-theme-primary">Instant Deploy</h3>
                  <p className="text-sm text-theme-muted">Deploy in under a minute</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative mt-8 rounded-2xl border border-theme-primary bg-theme-card p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-secondary-300 dark:hover:border-secondary-500/30">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-500 to-pink-600 shadow-lg shadow-secondary-500/20">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-theme-primary">Secure</h3>
                  <p className="text-sm text-theme-muted">Audited contracts</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-2xl border border-theme-primary bg-theme-card p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-500/30">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
                    <Coins className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-theme-primary">Multi-Chain</h3>
                  <p className="text-sm text-theme-muted">Ethereum, Polygon & more</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative mt-8 rounded-2xl border border-theme-primary bg-theme-card p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500/30">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/20">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-theme-primary">Verified</h3>
                  <p className="text-sm text-theme-muted">Auto verification</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-theme-primary to-transparent" />
    </section>
  );
};
