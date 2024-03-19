const GameIdMinecraft = 432;
const ClassIdMods = 6;

interface BasicResponse<T> {
  data: T;
}

type ListResponse<T> = BasicResponse<T[]>;

interface Pagination {
  index: number;
  pageSize: number;
  totalCount: number;
}

type PaginationResponse<T> = ListResponse<T> & {
  pagination: Pagination;
};

interface SearchResultMod {
  id: number;
  author: Author;
  avatarUrl: string;
  categories: Category[];
  downloads: number;
  name: string;
  slug: string;
  summary: string;
  updateDate: number;
  fileSize: number;
}

interface Author {
  id: number;
  name: string;
  username: string;
}

interface Category {
  id: number;
  iconUrl: string;
  name: string;
  slug: string;
}

type SearchModsCondition = {
  index?: number;
  pageSize?: number;
  sortField?: SortField;
};

enum SortField {
  Relevancy = 1,
  Popularity = 2,
  LatestUpdate = 3,
  CreationDate = 5,
  TotalDownloads = 6,
  Alphabet = 7,
}

export default class CurseForgeApi {
  baseURL: string;

  constructor(baseURL = 'https://www.curseforge.com/api') {
    this.baseURL = baseURL;
  }

  async searchMods({
    index = 0,
    pageSize = 50,
    sortField = SortField.Relevancy,
  }: SearchModsCondition): Promise<PaginationResponse<SearchResultMod>> {
    const url = new URL(`${this.baseURL}/v1/mods/search`);
    url.searchParams.set('gameId', `${GameIdMinecraft}`);
    url.searchParams.set('classId', `${ClassIdMods}`);

    if (index !== undefined) {
      url.searchParams.set('index', `${index}`);
    }

    if (pageSize !== undefined) {
      url.searchParams.set('pageSize', `${pageSize}`);
    }

    if (sortField !== undefined) {
      url.searchParams.set('sortField', `${sortField}`);
    }

    const resp = await fetch(url);
    const body: PaginationResponse<SearchResultMod> = await resp.json();
    return body;
  }
}
