import { Helmet } from '@modern-js/runtime/head';
import { Outlet } from '@modern-js/runtime/router';
import { Flex, Divider, Checkbox, Select, SelectProps } from 'antd';
import './search.scss';

const Aside = () => {
  return (
    <Flex className="aside" vertical>
      <strong className="title">过滤器</strong>
      <Divider className="divider" type="horizontal" />
      <ModLoaders />
      <Divider className="divider" type="horizontal" />
      <MinecraftVersionSelect />
      <Divider className="divider" type="horizontal" />
      <Categories />
    </Flex>
  );
};

const ModLoaders = () => {
  return (
    <Flex vertical gap={8}>
      <strong>模组加载器</strong>
      <Checkbox.Group>
        <Flex vertical>
          <Checkbox value="forge">Forge</Checkbox>
          <Checkbox value="fabric">Fabric</Checkbox>
          <Checkbox value="quilt">Quilt</Checkbox>
          <Checkbox value="neo-forge">NeoForge</Checkbox>
        </Flex>
      </Checkbox.Group>
    </Flex>
  );
};

const MinecraftVersionSelect = () => {
  const versions = ['1.20.1', '1.16.5', '1.12.2', '1.7.10'];
  const options: SelectProps['options'] = versions.map(version => ({
    value: version,
    label: `Minecraft ${version}`,
  }));
  return (
    <Flex vertical gap={8}>
      <strong>Minecraft版本</strong>
      <Select
        options={options}
        allowClear={true}
        placeholder="请选择Minecraft版本"
      />
    </Flex>
  );
};

const Categories = () => {
  return (
    <Flex>
      <strong>分类</strong>
    </Flex>
  );
};

const Layout = () => {
  return (
    <>
      <Helmet title="模组搜索" />
      <Flex className="search">
        <Aside />
        <Flex flex={1}>
          <Outlet />
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;
