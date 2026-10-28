import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './BrandLogo';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { DEMO_USERS } from '../data/mockMarketplace';

interface SignupPageProps {
  onSuccess?: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onSuccess,
  isModal = false,
  onClose,
}) => {
  const { signup, signin, signinAsGuest, loginAsDemoUser } = useAuth();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validation indicators
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      if (!hasMinLength || !hasLetter || !hasNumber) {
        setErrorMsg('Password must be at least 8 characters and include a letter and number.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify.');
        return;
      }
      if (!agreedToTerms) {
        setErrorMsg('You must agree to the Terms & Auction Guidelines to continue.');
        return;
      }

      setIsSubmitting(true);
      try {
        await signup({
  name: fullName.trim(),
  email: email.trim(),
  password,
  college: collegeName.trim() || undefined,
  isStudent,
});
        if (onSuccess) onSuccess();
      } catch {
        setErrorMsg('An error occurred during account creation. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Sign in mode
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter your registered email address.');
        return;
      }
      if (!password) {
        setErrorMsg('Please enter your password.');
        return;
      }

      setIsSubmitting(true);
      try {
        await signin(email.trim(), password);
        if (onSuccess) onSuccess();
      } catch {
        setErrorMsg('Could not find account. Please verify credentials.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDemoLogin = (userId: string) => {
    loginAsDemoUser(userId);
    if (onSuccess) onSuccess();
  };

  const handleGuestContinue = () => {
    signinAsGuest();
    if (onSuccess) onSuccess();
  };

  return (
    <div className={`min-h-screen bg-[#F5F8FC] flex flex-col justify-between ${isModal ? 'min-h-0' : ''}`}>
      {/* Top Bar on Full Page */}
      {!isModal && (
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <BrandLogo size="md" showTagline />
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Student Hackathon Project Showcase
            </span>
            <button
              onClick={handleGuestContinue}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
            >
              Continue as Guest &rarr;
            </button>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Column: Brand Hero & Value Proposition */}
        <div className="flex-1 max-w-xl text-left">
          <div className="mb-6">
            <BrandLogo size="xl" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3A] tracking-tight leading-[1.15] mb-5">
            Welcome to Bidz — Where Every Bid Opens an Opportunity.
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Discover deals, sell what you no longer need, showcase your skills and compete in exciting live auctions across sports memorabilia, college essentials, electronics, vehicles, skill services, and government procurement tenders.
          </p>

          {/* Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Live Real-Time Bidding</h4>
                <p className="text-xs text-slate-500">Fast countdown timers, auto-increments, and transparent bid histories.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Campus College Market</h4>
                <p className="text-xs text-slate-500">Student verified textbooks, dorm gear, calculators, and bicycles.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Skill & Freelance Tenders</h4>
                <p className="text-xs text-slate-500">Bid on high-impact dev MVPs, UI/UX design, and verified project RFPs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Verified Seller Standards</h4>
                <p className="text-xs text-slate-500">COA certificates for memorabilia, VIN checks for vehicles.</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Selector */}
          <div className="mt-8 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                Quick Demo 1-Click Sign-In
              </span>
              <span className="text-[11px] text-slate-400">Sample Hackathon Profiles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleDemoLogin(demo.id)}
                  className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/60 transition-all text-left group"
                >
                  <img
                    src={demo.avatar}
                    alt={demo.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 truncate">
                      {demo.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate capitalize">
                      {demo.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dedicated Auth Card */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={mode === 'signup' ? 'name@university.edu or email@domain.com' : 'Enter your registered email'}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Demo Mode: You can sign in with any mock email or select one of the Quick Demo profiles above!')}
                      className="text-[11px] text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Password requirements meter */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${hasMinLength ? 'text-emerald-600' : 'text-slate-300'}`} />
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${hasLetter && hasNumber ? 'text-emerald-600' : 'text-slate-300'}`} />
                      <span>Includes letters and numbers</span>
                    </div>
                    {confirmPassword.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${passwordsMatch ? 'text-emerald-600' : 'text-rose-500'}`} />
                        <span>{passwordsMatch ? 'Passwords match' : 'Passwords do not match'}</span>
                      </div>
                    )}
                  </div>

                  {/* College Marketplace Integration Optional Field */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                        College Campus (Optional)
                      </label>
                      <span className="text-[10px] text-slate-400">For Student Resale</span>
                    </div>
                    <input
                      type="text"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="e.g. Stanford, Berkeley, MIT, UW"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs transition-all mb-2"
                    />

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                      <input
                        type="checkbox"
                        checked={isStudent}
                        onChange={(e) => setIsStudent(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                      <span>Enable verified student badge & dorm pickup access</span>
                    </label>
                  </div>

                  {/* Terms agreement */}
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 select-none pt-1">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-0.5"
                    />
                    <span>
                      I agree to the{' '}
                      <span className="text-blue-600 hover:underline">Terms of Service</span>,{' '}
                      <span className="text-blue-600 hover:underline">Auction Rules</span>, and{' '}
                      <span className="text-blue-600 hover:underline">Privacy Policy</span>.
                    </span>
                  </label>
                </>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>{mode === 'signup' ? 'Create Account & Enter Marketplace' : 'Sign In to Bidz'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Guest browsing action */}
              <button
                type="button"
                onClick={handleGuestContinue}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors text-xs text-center"
              >
                Browse Marketplace as Guest (Demo Mode)
              </button>
            </form>

            {/* Disclaimer */}
            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400">
                Student Hackathon Demonstration: All accounts, bids, tenders, and currency are simulated for prototyping purposes.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {!isModal && (
        <footer className="border-t border-slate-200 bg-white py-6 px-6 text-center text-xs text-slate-500">
          <p>&copy; 2026 Bidz Live Auction Marketplace. Built with the official Bidz brand identity.</p>
        </footer>
      )}
    </div>
  );
};
