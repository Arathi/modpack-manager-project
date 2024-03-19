import CurseForgeApi from '@/apis/CurseForgeApi';
import Mod, { Pagination } from '@/domains/Mod';

const curseForgeApi = new CurseForgeApi();

export type LoaderData = {
  data: Mod[];
  pagination: Pagination;
};

export const loader = async (): Promise<LoaderData> => {
  const resp = await curseForgeApi.searchMods({});

  const data: Mod[] = resp.data.map(mod => ({
    id: mod.id,
    slug: mod.slug,
    name: mod.name,
    logo: mod.avatarUrl,
    author: mod.author.name,
    description: mod.summary,
    downloads: mod.downloads,
    updatedAt: mod.updateDate,
    fileSize: mod.fileSize,
    categories: mod.categories.map(cat => ({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      icon: cat.iconUrl,
    })),
  }));

  const pagination: Pagination = {
    index: resp.pagination.index,
    size: resp.pagination.pageSize,
    total: resp.pagination.totalCount,
  };

  const loaderData = {
    data,
    pagination,
  };

  console.info('搜索结果：', loaderData);
  return loaderData;
};
