import { GradientCard } from "./FeatureCard";


export default function FeatureSection() {
  return (
    <section className="min-h-screen py-16 px-4 sm:px-8 lg:px-16 bg-[#0e131f]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
            Features at a Glance
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Explore the capabilities that make our platform intuitive, secure,
            and modern.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <GradientCard
            title="Send Money Seamlessly"
            subtitle="Simulate peer-to-peer transfers with smooth, intuitive UI."
          />
          <GradientCard
            title="Balance Overview"
            subtitle="View your current balance and recent activity instantly."
          />
          <GradientCard
            title="Secure Authentication"
            subtitle="Access protected routes using JWT-based auth."
          />
          <GradientCard
            title="Modern Tech Stack"
            subtitle="Built with React, Node.js, Prisma, and MongoDB."
          />
        </div>
      </div>
    </section>
  );
}
