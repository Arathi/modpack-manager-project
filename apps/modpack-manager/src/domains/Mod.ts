export default interface Mod {
  id: number | string;
  slug: string;
  name: string;
  logo: string;
  author: string;
  description: string;
  downloads: number;
  updatedAt: number;
  fileSize: number;
  categories: Category[];
}

export interface Category {
  id: number | string;
  slug: string;
  name: string;
  icon: string;
}

export interface Pagination {
  index: number;
  size: number;
  total: number;
}
