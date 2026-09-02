import { defineQuery } from "next-sanity";

const projectFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  tagline,
  description,
  role,
  timeline,
  tags,
  "image": image.asset->url,
  accent,
  links,
  highlights
`;

export const allProjectsQuery = defineQuery(
  `*[_type == "project"] | order(order asc, _createdAt asc) { ${projectFields} }`
);

export const projectBySlugQuery = defineQuery(
  `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`
);

export const projectSlugsQuery = defineQuery(
  `*[_type == "project" && defined(slug.current)][].slug.current`
);
