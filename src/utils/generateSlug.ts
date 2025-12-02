export const generateSlug = (title: string, tags: string[]) => {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const tagSlugs = tags.map((tag) => tag.toLowerCase().replace(/\s+/g, "-"));
  return `${slug}-${tagSlugs.join("-")}`;
};
