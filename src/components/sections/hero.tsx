"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const item = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-accent-soft blur-3xl"
      />

      <Container className="relative">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: reduceMotion ? 0 : 0.12 }}
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold tracking-[0.22em] text-accent uppercase"
          >
            {site.title.split("|")[0]?.trim()}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-4 font-display text-5xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl"
          >
            {site.name}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {site.heroTagline}
          </motion.p>
          <motion.p variants={item} className="mt-3 text-sm text-muted">
            {site.location} · {site.availability}
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <Button href="#contact">Get in touch</Button>
            <Button href={site.resumePath} variant="secondary" download>
              Download resume
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
