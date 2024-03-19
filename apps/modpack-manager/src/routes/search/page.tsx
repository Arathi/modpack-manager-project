import {
  Divider,
  Flex,
  Image,
  Input,
  Select,
  Button,
  Pagination,
  PaginationProps,
} from 'antd';
import { useLoaderData } from '@modern-js/runtime/router';
import { FaDatabase, FaClock, FaDownload } from 'react-icons/fa6';
import type { LoaderData } from './page.data';
import Mod, { Category } from '@/domains/Mod';

const Index = () => {
  const { data, pagination } = useLoaderData() as LoaderData;

  const paginationProps: PaginationProps = {
    current: pagination.index,
    pageSize: pagination.size,
    total: pagination.total,
  };

  return (
    <Flex vertical gap={8} style={{ padding: 8 }}>
      <Flex gap={8}>
        <Input placeholder="关键字" />
        <Button type="primary">搜索</Button>
      </Flex>
      <Flex gap={8}>
        <Select placeholder="排序规则" />
        <Flex flex={1}>
          <div></div>
        </Flex>
        <Pagination {...paginationProps} />
      </Flex>
      <SearchResultList mods={data} />
    </Flex>
  );
};

type SearchResultListProps = {
  mods?: Mod[];
};
const SearchResultList: React.FC<SearchResultListProps> = ({ mods = [] }) => {
  const results = mods.map(mod => <SearchResult key={mod.id} mod={mod} />);
  return (
    <Flex vertical gap={8}>
      {results}
    </Flex>
  );
};

type SearchResultProps = {
  mod: Mod;
  style?: React.CSSProperties;
};
const SearchResult: React.FC<SearchResultProps> = ({ mod, style }) => {
  const categories: React.ReactNode[] = mod.categories.map(cat => (
    <CategoryIcon key={cat.id} category={cat} />
  ));

  const details: React.ReactNode[] = [
    <Amount key="downloads" icon={<FaDownload />} amount={mod.downloads} />,
    <DateTime key="updatedAt" icon={<FaClock />} timestamp={mod.updatedAt} />,
    <FileSize key="fileSize" icon={<FaDatabase />} size={mod.fileSize} />,
  ];

  return (
    <>
      <Flex className="search-result" vertical style={style}>
        <Flex gap={8}>
          <Image src={mod.logo} width={108} height={108} />
          <Flex vertical>
            <Flex gap={8}>
              <span>{mod.author}</span>
              <span style={{ color: 'gray' }}>/</span>
              <span>{mod.name}</span>
              <span style={{ color: 'gray' }}>|</span>
              <span style={{ color: 'gray' }}>#{mod.id}</span>
              <span style={{ color: 'gray' }}>@{mod.slug}</span>
            </Flex>
            <Flex flex={1} style={{ fontSize: '0.8em', color: 'gray' }}>
              {mod.description}
            </Flex>
            <Flex gap={16} align="center">
              {details}
            </Flex>
          </Flex>
        </Flex>
        <Divider style={{ marginTop: 4, marginBottom: 4 }} />
        <Flex gap={8}>{categories}</Flex>
      </Flex>
    </>
  );
};

type CategoryIconProps = {
  category: Category;
};
const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  return (
    <Flex>
      <Image src={category.icon} width={30} height={30} preview={false} />
    </Flex>
  );
};

type DetailProps = {
  icon?: React.ReactNode;
  text?: React.ReactNode;
};
const Detail: React.FC<DetailProps> = ({ icon, text }) => {
  return (
    <Flex gap={8} justify="center" align="center">
      {icon}
      {text}
    </Flex>
  );
};

type AmountProps = {
  icon?: React.ReactNode;
  amount?: number;
};
const Amount: React.FC<AmountProps> = ({ icon, amount = 0 }) => {
  let unit = '';
  let value = `${amount}`;
  if (amount >= 1_0000_0000) {
    value = (amount / 1_0000_0000).toFixed(2);
    unit = '亿';
  } else if (amount >= 1_0000) {
    value = (amount / 1_0000).toFixed(2);
    unit = '万';
  }
  const text = `${value} ${unit}`;
  return <Detail icon={icon} text={text} />;
};

type FileSizeProps = {
  icon?: React.ReactNode;
  size?: number;
};
const FileSize: React.FC<FileSizeProps> = ({ icon, size = 0 }) => {
  let unit = 'B';
  let value = `${size}`;
  if (size >= 1_000_000_000) {
    value = (size / 1_000_000_000).toFixed(2);
    unit = 'GB';
  } else if (size >= 1_000_000) {
    value = (size / 1_000_000).toFixed(2);
    unit = 'MB';
  } else if (size >= 1_000) {
    value = (size / 1_000).toFixed(2);
    unit = 'kB';
  }
  return <Detail icon={icon} text={`${value} ${unit}`} />;
};

type DateTimeProps = {
  icon?: React.ReactNode;
  timestamp?: number;
};
const DateTime: React.FC<DateTimeProps> = ({ icon, timestamp = 0 }) => {
  const date = new Date(timestamp * 1000);
  const year = `${date.getFullYear()}`.padStart(4, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDay()}`.padStart(2, '0');
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  const second = `${date.getSeconds()}`.padStart(2, '0');
  const text = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return <Detail icon={icon} text={text} />;
};

export default Index;
