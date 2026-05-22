"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, BookOpen, Image, ImageIcon } from "lucide-react";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const validatePassword = (value) => {
    if (value.length < 6) {
        return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(value)) {
        return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(value)) {
        return "Password must contain at least one number";
    }
    return "";
};


export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", image: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ password: "" });
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        // validator 
        const passwordError = validatePassword(formData.password);

        if (passwordError) {
            setErrors((prev) => ({ ...prev, password: passwordError }));
            return;
        }

        const { name, image, email, password } = formData;

        const { data, error } = await authClient.signUp.email({
            email, 
            password, 
            name, 
            image, 

        }, {
            onSuccess: (ctx) => {
                toast.success('Signup successfull')
                router.push('/login')
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            },
        });

    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 pt-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md overflow-hidden rounded-3xl border bg-card shadow-2xl"
            >
                <div className="bg-linear-to-br from-violet-600 to-teal-700 p-8 text-center text-white">
                    <Link href="/" className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                        <BookOpen size={32} />
                    </Link>
                    <h1 className="text-3xl font-black">Join MediQueue</h1>
                    <p className="mt-2 text-teal-100">Start your learning journey today</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border bg-card py-4 pl-12 pr-4 shadow-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">Image URL</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <input
                                    type="url"
                                    required
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full rounded-xl border bg-card py-4 pl-12 pr-4 shadow-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                                    placeholder="https://unsplash.com/new/image"
                                />
                            </div>

                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full rounded-xl border bg-card py-4 pl-12 pr-4 shadow-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>



                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        setFormData((prev) => ({ ...prev, password: value }));
                                        setErrors((prev) => ({
                                            ...prev,
                                            password: validatePassword(value),
                                        }));
                                    }}
                                    className={`w-full rounded-xl border bg-card py-4 pl-12 pr-4 shadow-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 ${errors.password ? "border-red-500" : ""}`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 pl-1">{errors.password}</p>
                            )}

                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-teal-700 disabled:opacity-50"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                            <UserPlus size={20} />
                        </button>
                    </form>

                    <div className="relative my-8">

                        <div className="relative flex items-center my-4">
                            <div className="grow border-t border-border"></div>
                            <span className="shrink mx-4 text-xs uppercase tracking-widest text-muted-foreground font-bold">
                                Or continue with
                            </span>
                            <div className="grow border-t border-border"></div>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border bg-card py-4 font-bold text-foreground transition-all hover:bg-muted"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google Login
                    </button>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="font-bold text-teal-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
