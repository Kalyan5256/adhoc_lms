import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PhilosophySection() {
  return (
    <section
      id="about"
      className="py-12 sm:py-16 px-3 sm:px-8 bg-surface-container-lowest border-y border-surface-dim/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-2xl sm:text-4xl font-headline font-bold text-primary">
            Academic Authority, Digital Speed - Now for the Enterprise
          </h2>
          <p className="text-secondary text-lg leading-relaxed">
            The traditional classroom just got an upgrade. We’ve built a
            high-speed learning environment that cuts through the noise. With
            clean typography and a distraction-free layout, mastering complex
            material has never been more efficient. Your path to
            industry-recognized certification starts here.
          </p>
          <ul className="space-y-4">
            {[
              "150+ Expert Mentors from Global Firms",
              "Certifications recognized across the tech industry",
              "Limited-time access to premium course assets",
              "24/7 Mentor Support & Community Access",
            ].map((text, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-on-surface font-medium group"
              >
                <ShieldCheck className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-48 sm:h-64 rounded-3xl bg-surface-container overflow-hidden shadow-md group"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=50&fm=webp"
              srcSet="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&auto=format&fit=crop&q=50&fm=webp 300w, https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=50&fm=webp 400w"
              sizes="(max-width: 640px) 300px, 400px"
              width="300"
              height="256"
              className="w-full h-full object-cover cursor-pointer"
              alt="Campus Life"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="h-56 sm:h-72 mt-8 sm:mt-12 rounded-3xl bg-surface-container overflow-hidden shadow-md group"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=50&fm=webp"
              srcSet="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&auto=format&fit=crop&q=50&fm=webp 300w, https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=50&fm=webp 400w"
              sizes="(max-width: 640px) 300px, 400px"
              width="300"
              height="288"
              className="w-full h-full object-cover cursor-pointer"
              alt="Study"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
