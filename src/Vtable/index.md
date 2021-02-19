---
nav:
  title: Components
  path: /components
---

## Vtable 默认展示

Demo:

```tsx
import React, { useState } from 'react';
import Vtable from './index';
import 'antd/dist/antd.css';
import { Input } from 'antd';
const columns = [
  {
    title: 'A',
    dataIndex: 'key',
    width: 150,
    render: (text: any, record: any) => {
      return <Input />;
    },
  },
  { title: 'B', dataIndex: 'key', width: 200 },
  { title: 'C', dataIndex: 'key' },
  {
    title: 'D',
    dataIndex: 'key',
    width: 200,
    sorter: true,
  },
  { title: '1', dataIndex: 'key', width: 200 },
  { title: '2', dataIndex: 'key', width: 200 },
  { title: '3', dataIndex: 'key', width: 200 },
  { title: '4', dataIndex: 'key', width: 200 },
  { title: '5', dataIndex: 'key', width: 200 },
  { title: '6', dataIndex: 'key', width: 200 },
  { title: '7', dataIndex: 'key', width: 200 },
  { title: '8', dataIndex: 'key' },
];

const data = Array.from({ length: 100000 }, (_, key) => ({ key }));
function App() {
  return <Vtable columns={columns} dataSource={data} scroll={{ y: 300 }} />;
}

export default () => <App />;
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle

## Vtable 勾选

勾选:

```tsx
import React, { useState } from 'react';
import Vtable from './index';
import 'antd/dist/antd.css';
import { Input } from 'antd';
const columns = [
  {
    title: 'A',
    dataIndex: 'key',
    width: 150,
    render: (text: any, record: any) => {
      return <Input />;
    },
  },
  { title: 'B', dataIndex: 'key', width: 200 },
  { title: 'C', dataIndex: 'key' },
  {
    title: 'D',
    dataIndex: 'key',
    width: 200,
    sorter: true,
  },
  { title: '1', dataIndex: 'key', width: 200 },
  { title: '2', dataIndex: 'key', width: 200 },
  { title: '3', dataIndex: 'key', width: 200 },
  { title: '4', dataIndex: 'key', width: 200 },
  { title: '5', dataIndex: 'key', width: 200 },
  { title: '6', dataIndex: 'key', width: 200 },
  { title: '7', dataIndex: 'key', width: 200 },
  { title: '8', dataIndex: 'key' },
];

const data = Array.from({ length: 100000 }, (_, key) => ({ key }));
function App() {
  const [selectedRows, setSelectedRows] = useState([]);
  const handleTableChange = (pagination, filters, sorter) => {};
  return (
    <Vtable
      selectedRows={selectedRows}
      columns={columns}
      dataSource={data}
      scroll={{ y: 300 }}
      onChange={handleTableChange}
      onSelect={(e: any) => {
        console.log(e, 'kll');
        setSelectedRows(e);
      }}
      selectable
    />
  );
}

export default () => <App />;
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle

## Vtable 边框

边框:

```tsx
import React, { useState } from 'react';
import Vtable from './index';
import 'antd/dist/antd.css';
import { Input } from 'antd';
const columns = [
  {
    title: 'A',
    dataIndex: 'key',
    width: 150,
    render: (text: any, record: any) => {
      return <Input />;
    },
  },
  { title: 'B', dataIndex: 'key', width: 200 },
  { title: 'C', dataIndex: 'key' },
  {
    title: 'D',
    dataIndex: 'key',
    width: 200,
    sorter: true,
  },
  { title: '1', dataIndex: 'key', width: 200 },
  { title: '2', dataIndex: 'key', width: 200 },
  { title: '3', dataIndex: 'key', width: 200 },
  { title: '4', dataIndex: 'key', width: 200 },
  { title: '5', dataIndex: 'key', width: 200 },
  { title: '6', dataIndex: 'key', width: 200 },
  { title: '7', dataIndex: 'key', width: 200 },
  { title: '8', dataIndex: 'key' },
];

const data = Array.from({ length: 100000 }, (_, key) => ({ key }));
function App() {
  return (
    <Vtable bordered columns={columns} dataSource={data} scroll={{ y: 300 }} />
  );
}

export default () => <App />;
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle

## Props

| 参数       | 说明           | 类型    | 默认值 |
| ---------- | -------------- | ------- | ------ |
| selectable | 是否有勾选框   | Boolean | false  |
| onSelect   | 默认已选项信息 | func    | 无     |
