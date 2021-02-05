---
nav:
  title: Components
  path: /components
---

## Vtable

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
  { title: 'D', dataIndex: 'key', width: 200 },
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
console.log(Vtable, '===========');
function App() {
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <Vtable
      selectedRows={selectedRows}
      columns={columns}
      dataSource={data}
      scroll={{ y: 300, x: 1280 }}
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