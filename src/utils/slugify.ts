export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z\s-]/g, '') // remove numbers & special chars
    .trim()
    .split(/\s+/) // split on whitespace
    .join('-')
}
