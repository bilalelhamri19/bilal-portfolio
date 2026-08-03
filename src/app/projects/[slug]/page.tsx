import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  User,
  Target,
  CheckSquare,
  Layers,
  Sparkles,
  Home,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import { formatDateRange, cn } from "@/lib/utils";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({
  params,
}: ProjectPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Project`,
    description: project.overview,
    openGraph: {
      title: project.title,
      description: project.overview,
      images: [project.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.overview,
      images: [project.image],
    },
  };
}

import { ProjectPageClient } from "./project-page-client";

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
