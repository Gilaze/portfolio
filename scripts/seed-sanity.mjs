// One-time migration of the old static src/data project list into Sanity.
// Usage: SANITY_API_WRITE_TOKEN=... node scripts/seed-sanity.mjs
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID (or have it in your env) and SANITY_API_WRITE_TOKEN before running this script."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-01-01",
  useCdn: false,
});

const projects = [
  {
    slug: "realtime-chat-platform",
    title: "Realtime Chat Platform",
    tagline: "A low-latency messaging app with rooms, presence, and typing indicators.",
    description: [
      "Built a full-stack chat application supporting thousands of concurrent WebSocket connections, with rooms, direct messages, and live presence indicators.",
      "Designed the backend around an event-driven architecture with Redis pub/sub for horizontal scaling across multiple server instances, and PostgreSQL for durable message history.",
      "Focused heavily on perceived performance: optimistic UI updates, message reconciliation, and reconnect-with-backfill logic so users never lose context after a dropped connection.",
    ],
    role: "Full-stack developer (solo project)",
    timeline: "Spring 2025 · 6 weeks",
    tags: ["TypeScript", "Node.js", "WebSockets", "Redis", "PostgreSQL", "React"],
    imageFile: "realtime-chat-platform.svg",
    accent: "#6366f1",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Live demo", href: "https://example.com" },
    ],
    highlights: [
      "Handles 5k+ concurrent connections on a single instance",
      "Sub-100ms message delivery p95",
      "Horizontal scaling via Redis pub/sub",
    ],
    order: 0,
  },
  {
    slug: "ml-image-classifier",
    title: "ML Image Classifier",
    tagline: "A CNN-based image classifier with a web front end for live inference.",
    description: [
      "Trained a convolutional neural network from scratch to classify images across 20 categories, then fine-tuned a pretrained ResNet backbone to compare transfer-learning performance.",
      "Wrapped the trained model in a FastAPI inference service and built a React front end where users can upload an image and see live predictions with confidence scores.",
      "Wrote a full experiment-tracking pipeline to compare hyperparameters, data augmentation strategies, and architectures across dozens of training runs.",
    ],
    role: "ML engineer & developer",
    timeline: "Fall 2024 · course capstone",
    tags: ["Python", "PyTorch", "FastAPI", "React", "Docker"],
    imageFile: "ml-image-classifier.svg",
    accent: "#f59e0b",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Write-up", href: "https://example.com" },
    ],
    highlights: [
      "94.2% top-1 accuracy on held-out test set",
      "Transfer learning vs. from-scratch comparison",
      "Dockerized inference API",
    ],
    order: 1,
  },
  {
    slug: "ecommerce-storefront",
    title: "E-Commerce Storefront",
    tagline: "A fast, accessible storefront with cart, checkout, and order tracking.",
    description: [
      "Built a full storefront experience from product catalog through checkout, including cart persistence, discount codes, and Stripe-powered payments.",
      "Prioritized accessibility and performance: server-rendered product pages, keyboard-navigable cart and checkout flows, and Lighthouse scores above 95 across the board.",
      "Implemented an admin dashboard for managing inventory and viewing order history, backed by a relational schema designed for reporting queries.",
    ],
    role: "Full-stack developer (team of 2)",
    timeline: "Summer 2024 · 8 weeks",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    imageFile: "ecommerce-storefront.svg",
    accent: "#10b981",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Live demo", href: "https://example.com" },
    ],
    highlights: [
      "Lighthouse performance & a11y scores 95+",
      "End-to-end Stripe checkout integration",
      "Admin dashboard for inventory & orders",
    ],
    order: 2,
  },
  {
    slug: "devops-observability-dashboard",
    title: "DevOps Observability Dashboard",
    tagline: "A custom metrics dashboard for tracking service health across microservices.",
    description: [
      "Designed and built a dashboard that aggregates metrics and logs from a microservices demo environment into a single real-time view.",
      "Built custom charting components for latency percentiles, error rates, and throughput, with alerting thresholds that highlight degraded services.",
      "Instrumented sample services with OpenTelemetry to explore distributed tracing and correlate slow requests across service boundaries.",
    ],
    role: "Backend & frontend developer",
    timeline: "Winter 2025 · 4 weeks",
    tags: ["React", "Go", "OpenTelemetry", "Prometheus", "Grafana"],
    imageFile: "devops-observability-dashboard.svg",
    accent: "#0ea5e9",
    links: [{ label: "GitHub", href: "https://github.com" }],
    highlights: [
      "Custom p50/p95/p99 latency visualizations",
      "Distributed tracing across 6 mock services",
      "Configurable alert thresholds",
    ],
    order: 3,
  },
];

async function uploadImage(filename) {
  const filePath = path.join(root, "public", "projects", filename);
  const buffer = await readFile(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

async function run() {
  for (const project of projects) {
    const imageAssetId = await uploadImage(project.imageFile);
    const { imageFile, ...rest } = project;
    void imageFile;

    const doc = {
      _type: "project",
      ...rest,
      slug: { _type: "slug", current: project.slug },
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: imageAssetId },
      },
    };

    const result = await client.createIfNotExists({
      _id: `project-${project.slug}`,
      ...doc,
    });
    console.log(`Seeded: ${result.title}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
