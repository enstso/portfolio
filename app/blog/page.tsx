import Link from "next/link";
import { Bell, Calendar, User, ArrowRight, Linkedin, ExternalLink } from "lucide-react";

export default function Blog() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">

          {/* Main Content */}
          <div className="text-center max-w-2xl mx-auto">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-8 shadow-sm">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              Coming Soon
            </div>

            {/* Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg flex items-center justify-center">
              <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent leading-tight">
              Blog Coming Soon
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-xl mx-auto">
              {"I'm working on creating valuable content about"}{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">full-stack development</span>,{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">cloud architecture</span>, and{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">industry insights</span>.
            </p>

            {/* Features Preview */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <User className="h-6 w-6 text-blue-600 mb-2 mx-auto" />
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  Tech Insights
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Development tips & best practices
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <Calendar className="h-6 w-6 text-blue-600 mb-2 mx-auto" />
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  Project Stories
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Behind-the-scenes experiences
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <Bell className="h-6 w-6 text-blue-600 mb-2 mx-auto" />
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  Industry News
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Latest trends & technologies
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                  href="https://www.linkedin.com/in/enstso-j-1a274724a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              >
                <Linkedin className="h-4 w-4" />
                Get Notified on LinkedIn
                <ExternalLink className="h-3 w-3" />
              </Link>

              <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
              >
                Back to Portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Expected Launch */}
            <div className="mt-10 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Expected launch: <span className="font-semibold text-slate-900 dark:text-white">Q1 2026</span>
              </p>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
  );
}
