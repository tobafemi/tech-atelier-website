/** Resolve a file in /public so it works at the site root and in relative-path builds. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
