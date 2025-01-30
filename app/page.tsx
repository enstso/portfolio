"use client";
import {DownloadResume} from "@/components/home/downloadResume"
import { SocialMedia } from "@/components/home/socialMedia";
import { socialMediaLink } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-12 py-12 text-neutral-900 dark:text-neutral-100">
      {/* Introduction Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          👋 Hi, I’m <span className="text-neutral-900 dark:text-neutral-100">Enstso</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-200 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 mb-6">
          I specialize in creating robust digital solutions that merge software
          development with infrastructure and cybersecurity excellence. Proficient in{" "}
          <strong>JavaScript, React, Angular, .NET, Node.js, Python</strong>, I craft high-performance
          web and mobile applications tailored to meet your needs.
        </p>
        <p className="text-neutral-600 dark:text-neutral-200 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 mb-6">
          Beyond development, I bring extensive experience in{" "}
          <strong>cloud technologies</strong> like Docker, Kubernetes, and OpenShift, as well
          as system and network administration. My expertise in{" "}
          <strong>cybersecurity</strong> ensures secure, reliable, and scalable solutions,
          giving you peace of mind in today’s digital landscape.
        </p>
        <p className="text-neutral-600 dark:text-neutral-200 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8">
          With a deep commitment to quality and innovation, I’m here to help you build,
          secure, and grow your digital presence. Let’s collaborate to turn your vision into reality!
        </p>
      </section>
      <DownloadResume/>
      {/* Social Media Links */}
      <section className="mt-12">
        <SocialMedia items={socialMediaLink} />
      </section>
    </div>
  );
}
