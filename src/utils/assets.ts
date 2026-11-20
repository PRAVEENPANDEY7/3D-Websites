/// <reference types="vite/client" />

export const getAssetUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = (import.meta as any).env?.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${cleanPath}`;
};
