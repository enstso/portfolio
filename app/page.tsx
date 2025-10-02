"use client";
import { DownloadResume } from "@/components/home/downloadResume"
import { SocialMedia } from "@/components/home/socialMedia";
import { socialMediaLink } from "@/lib/utils";
import { Database, Shield, Cloud, Code2, BarChart3, Cog } from "lucide-react";

export default function Home() {
  const expertise = [
    {
      icon: <Code2 className="h-8 w-8 text-blue-600" />,
      title: "Full-Stack Development",
      description: "React, Angular, .NET, NestJS",
    },
    {
      icon: <Cloud className="h-8 w-8 text-blue-600" />,
      title: "Cloud Architecture",
      description: "Azure, AWS, Kubernetes, Docker",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Cybersecurity",
      description: "OWASP, Audit, Penetration Testing",
    },
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: "Data Analysis",
      description: "PostgreSQL, Redis, System Optimization",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Business Analysis",
      description: "Requirements Analysis, UML, FinOps",
    },
    {
      icon: <Cog className="h-8 w-8 text-blue-600" />,
      title: "DevOps & Infrastructure",
      description: "CI/CD, Terraform, System Administration",
    },
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Section Professional */}
        <section className="relative px-4 sm:px-6 lg:px-12 py-20 text-center max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent rounded-3xl -z-10"></div>

          {/* Badge Professionnel */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold mb-8 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Available for Professional Services
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent leading-tight">
            IT Analyst Engineer
            <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 text-slate-600 dark:text-slate-400">
                        Enstso JANVIER
                    </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl lg:text-2xl leading-relaxed mb-8 max-w-4xl mx-auto font-medium">
            Transforming business requirements into scalable technical solutions through
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> full-stack development</span>,
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> cloud architecture</span>, and
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> cybersecurity expertise</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tertiary sector</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Freelance Consultant</span>
            </div>
          </div>
        </section>

        {/* Expertise Grid */}
        <section className="px-4 sm:px-6 lg:px-12 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Core Expertise
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Comprehensive technical skills for modern enterprise solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
                <div
                    key={index}
                    className="group p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </section>

        {/* Professional Stats */}
        <section className="px-4 sm:px-6 lg:px-12 py-16 bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800 dark:to-slate-900">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">Years Experience</div>
              </div>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">Technologies Mastered</div>
              </div>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-12 py-16 text-center max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl shadow-2xl text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate to build scalable, secure, and innovative solutions that drive your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <DownloadResume />
              <SocialMedia items={socialMediaLink} />
            </div>
          </div>
        </section>
      </div>
  );
}
