"use client";

import { SocialMedia } from "@/components/home/socialMedia";
import { socialMediaLink } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black dark:text-white px-6 py-12">
      {/* Introduction Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">
          👋 Hi, I’m <span className="text-black dark:text-white">Enstso</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-7 mb-6">
          I specialize in creating robust digital solutions that merge software
          development with infrastructure and cybersecurity excellence. Proficient in{" "}
          <strong>JavaScript, React, Angular, .NET, Node.js, Python</strong>, I craft high-performance
          web and mobile applications tailored to meet your needs.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-7 mb-6">
          Beyond development, I bring extensive experience in{" "}
          <strong>cloud technologies</strong> like Docker, Kubernetes, and OpenShift, as well
          as system and network administration. My expertise in{" "}
          <strong>cybersecurity</strong> ensures secure, reliable, and scalable solutions,
          giving you peace of mind in today’s digital landscape.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-7">
          With a deep commitment to quality and innovation, I’m here to help you build,
          secure, and grow your digital presence. Let’s collaborate to turn your vision into reality!
        </p>
      </section>

      {/* Social Media Links */}
      <section className="mt-12">
        <SocialMedia items={socialMediaLink} />
      </section>
    </div>
  );
}
