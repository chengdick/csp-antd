import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table, Checkbox } from 'antd';
import './index.less';
function VirtualTable(props: any) {
  const { columns, scroll, selectable, selectedRows, dataSource } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const yesWidth = columns!
    .map(({ width }: any) => width)
    .filter(Boolean)
    .reduce((p: number, o: number) => {
      return p + o;
    }, 0);

  const widthColumnCount = columns!.filter(({ width }: any) => !width).length;
  const mergedColumns = columns!.map((column: any) => {
    if (column.width) {
      return column;
    }
    return {
      ...column,
      width:
        yesWidth > tableWidth
          ? 200
          : Math.floor((tableWidth - yesWidth - 80) / widthColumnCount),
    };
  });

  const onSelectAll = (e: any) => {
    e.target.checked ? props.onSelect(props.dataSource) : props.onSelect([]);
  };
  const onSelect = (e: any, text: any, record: any) => {
    !e.target.checked
      ? props.onSelect(
          selectedRows.filter((item: any) => {
            return item.key !== text;
          }),
        )
      : props.onSelect([...selectedRows, record]);
  };

  let lastcolumns: any = [];
  if (selectable) {
    lastcolumns = [
      {
        title: (
          <Checkbox
            indeterminate={
              selectedRows.length > 0 &&
              selectedRows.length !== dataSource.length
            }
            checked={selectedRows.length === dataSource.length}
            onChange={e => onSelectAll(e)}
          />
        ),
        dataIndex: 'key',
        render: (text: any, record: any) => {
          return (
            <Checkbox
              onChange={e => onSelect(e, text, record)}
              checked={selectedRows.some((item: any) => item.key === text)}
            />
          );
        },
        width: 80,
      },
      ...mergedColumns,
    ];
  } else {
    lastcolumns = mergedColumns;
  }

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (
    rawData: object[],
    { scrollbarSize, ref, onScroll }: any,
  ) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={lastcolumns.length}
        columnWidth={(index: number) => {
          const { width } = lastcolumns[index];
          return totalHeight > scroll!.y! && index === lastcolumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === lastcolumns.length - 1,
            })}
            style={style}
          >
            {(lastcolumns as any)[columnIndex].render
              ? (lastcolumns as any)[columnIndex].render(
                  (rawData[rowIndex] as any)[
                    (lastcolumns as any)[columnIndex].dataIndex
                  ],
                  rawData[rowIndex] as any,
                )
              : (rawData[rowIndex] as any)[
                  (lastcolumns as any)[columnIndex].dataIndex
                ]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }: any) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={lastcolumns}
        pagination={false}
        components={
          {
            body: renderVirtualList,
          } as any
        }
      />
    </ResizeObserver>
  );
}

export default VirtualTable;
