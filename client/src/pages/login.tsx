import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import { Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Logo } from '@/components/landing/Logo';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const [, setLocation] = useLocation();
    const { lang } = useLanguage();
    const { theme } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(username, password);

        if (result.success) {
            setLocation('/admin');
        } else {
            setError(result.error || 'Login failed');
        }

        setIsLoading(false);
    };

    return (
        <div className={`min-h-screen bg-background text-foreground flex items-center justify-center p-6 ${lang === 'gu' ? 'font-gujarati' : ''}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div
                    className={`absolute inset-0 ${theme === 'dark'
                        ? 'bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]'
                        : 'bg-[linear-gradient(to_right,#ddd_1px,transparent_1px),linear_gradient(to_bottom,#ddd_1px,transparent_1px)]'
                        } bg-[size:4rem_4rem]`}
                ></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    {lang === 'en' ? 'Back to Home' : 'હોમ પર પાછા જાઓ'}
                </Link>

                {/* Login Card */}
                <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Logo />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            {lang === 'en' ? 'Admin Login' : 'એડમિન લૉગિન'}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {lang === 'en' ? 'Enter your credentials to access the dashboard' : 'ડેશબોર્ડ ઍક્સેસ કરવા માટે તમારા ક્રેડેન્શિયલ્સ દાખલ કરો'}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-500">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {lang === 'en' ? 'Username' : 'વપરાશકર્તાનામ'}
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                                    placeholder={lang === 'en' ? 'Enter username' : 'વપરાશકર્તાનામ દાખલ કરો'}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {lang === 'en' ? 'Password' : 'પાસવર્ડ'}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                                    placeholder={lang === 'en' ? 'Enter password' : 'પાસવર્ડ દાખલ કરો'}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    {lang === 'en' ? 'Logging in...' : 'લૉગિન થઈ રહ્યું છે...'}
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    {lang === 'en' ? 'Login' : 'લૉગિન'}
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-border text-center">
                        <p className="text-xs text-muted-foreground">
                            {lang === 'en' ? 'Protected Area • Authorized Personnel Only' : 'સુરક્ષિત ક્ષેત્ર • માત્ર અધિકૃત કર્મચારીઓ'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
