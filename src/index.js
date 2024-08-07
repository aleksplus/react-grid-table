import React from "react";
import { SortableContainer } from "./drag-and-drop";
import { Row, HeaderCellContainer } from "./components/";
import { useTableManager } from "./hooks/";
import PropTypes from "prop-types";
import "./index.css";

const SortableList = SortableContainer(
    ({ forwardRef, className, style, children }) => (
        <div ref={forwardRef} className={className} style={style}>
            {children}
        </div>
    )
);

const GridTable = (props) => {
    const tableManager = useTableManager(props);

    const {
        id,
        isLoading,
        config: {
            isVirtualScroll,
            rowIdField,
            components: { Header, Footer, Loader, NoResults, DragHandle },
            additionalProps: { container: additionalProps = {} },
        },
        refs: { rgtRef, tableRef },
        columnsApi: { visibleColumns },
        columnsReorderApi: { onColumnReorderStart, onColumnReorderEnd },
        rowVirtualizer: { virtualItems },
        paginationApi: { pageRows },
        rowsApi: { totalRows },
    } = tableManager;

    const rest = Object.keys(props).reduce((rest, key) => {
        if (GridTable.propTypes[key] === undefined)
            rest = { ...rest, [key]: props[key] };
        return rest;
    }, {});

    const classNames = ("rgt-wrapper " + (props.className || "")).trim();
    const classNamesContainer = (
        "rgt-container " + (props.classNameContainer || "")
    ).trim();

    const children =
        typeof props.children === "function"
            ? props.children({ columns: visibleColumns })
            : props.children;
    const hasChildren = !!children;

    const getContainerCb = React.useCallback(() => tableRef, [tableRef]);

    const style = React.useMemo(
        () => ({
            ...additionalProps.style,
            display: "grid",
            overflow: "auto",
            flex: 1,
            gridTemplateColumns: visibleColumns
                .map((column) => column.width)
                .join(" "),
            gridTemplateRows: `repeat(${
                pageRows.length +
                1 +
                (isVirtualScroll ? 1 : 0) +
                (hasChildren ? 1 : 0)
            }, max-content)`,
        }),
        [
            additionalProps.style,
            hasChildren,
            isVirtualScroll,
            pageRows.length,
            visibleColumns,
        ]
    );

    return (
        <div {...rest} ref={rgtRef} id={id} className={classNames}>
            <Header tableManager={tableManager} />
            <SortableList
                forwardRef={tableRef}
                getContainer={getContainerCb}
                className={classNamesContainer}
                axis="x"
                lockToContainerEdges
                distance={10}
                lockAxis="x"
                useDragHandle={!!DragHandle}
                onSortStart={onColumnReorderStart}
                onSortEnd={onColumnReorderEnd}
                style={style}
            >
                {visibleColumns.map((visibleColumn, idx) => (
                    <HeaderCellContainer
                        key={visibleColumn.id}
                        index={idx}
                        column={visibleColumn}
                        tableManager={tableManager}
                    />
                ))}
                {children}
                {totalRows && visibleColumns.length > 1
                    ? isVirtualScroll
                        ? [
                              <Row
                                  key={"virtual-start"}
                                  index={"virtual-start"}
                                  tableManager={tableManager}
                              />,
                              ...virtualItems.map((virtualizedRow) => (
                                  <Row
                                      key={virtualizedRow.index}
                                      index={virtualizedRow.index}
                                      data={pageRows[virtualizedRow.index]}
                                      ref={virtualizedRow.measureRef}
                                      tableManager={tableManager}
                                  />
                              )),
                              <Row
                                  key={"virtual-end"}
                                  index={"virtual-end"}
                                  tableManager={tableManager}
                              />,
                          ]
                        : pageRows.map((rowData, index) => (
                              <Row
                                  key={rowData?.[rowIdField]}
                                  index={index}
                                  data={rowData}
                                  tableManager={tableManager}
                              />
                          ))
                    : null}
            </SortableList>
            {!totalRows || !visibleColumns.length ? (
                <div className="rgt-container-overlay">
                    {isLoading ? (
                        <Loader tableManager={tableManager} />
                    ) : (
                        <NoResults tableManager={tableManager} />
                    )}
                </div>
            ) : null}
            <Footer tableManager={tableManager} />
        </div>
    );
};

GridTable.defaultProps = {
    columns: [],
    rowIdField: "id",
    minColumnResizeWidth: 70,
    pageSizes: [20, 50, 100],
    isHeaderSticky: true,
    highlightSearch: true,
    minSearchChars: 2,
    isPaginated: true,
    isVirtualScroll: true,
    showSearch: true,
    showRowsInformation: true,
    showColumnVisibilityManager: true,
    enableColumnsReorder: true,
    requestDebounceTimeout: 300,
    getIsRowSelectable: () => true,
    getIsRowEditable: () => true,
    selectAllMode: "page", // ['page', 'all']
};

GridTable.propTypes = {
    // general
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object),
    selectedRowsIds: PropTypes.array,
    searchText: PropTypes.string,
    getIsRowSelectable: PropTypes.func,
    getIsRowEditable: PropTypes.func,
    editRowId: PropTypes.any,
    classNameContainer: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.node,
        PropTypes.func,
    ]),
    // table config
    rowIdField: PropTypes.string,
    batchSize: PropTypes.number,
    isPaginated: PropTypes.bool,
    enableColumnsReorder: PropTypes.bool,
    pageSizes: PropTypes.arrayOf(PropTypes.number),
    pageSize: PropTypes.number,
    page: PropTypes.number,
    sort: PropTypes.object,
    minColumnResizeWidth: PropTypes.number,
    highlightSearch: PropTypes.bool,
    showSearch: PropTypes.bool,
    showRowsInformation: PropTypes.bool,
    showColumnVisibilityManager: PropTypes.bool,
    minSearchChars: PropTypes.number,
    isLoading: PropTypes.bool,
    isHeaderSticky: PropTypes.bool,
    isVirtualScroll: PropTypes.bool,
    icons: PropTypes.object,
    texts: PropTypes.object,
    additionalProps: PropTypes.object,
    components: PropTypes.object,
    totalRows: PropTypes.number,
    requestDebounceTimeout: PropTypes.number,
    selectAllMode: PropTypes.string,
    // events
    onColumnsChange: PropTypes.func,
    onSearchTextChange: PropTypes.func,
    onSelectedRowsChange: PropTypes.func,
    onSortChange: PropTypes.func,
    onRowClick: PropTypes.func,
    onEditRowIdChange: PropTypes.func,
    onPageChange: PropTypes.func,
    onPageSizeChange: PropTypes.func,
    onLoad: PropTypes.func,
    onColumnResizeStart: PropTypes.func,
    onColumnResize: PropTypes.func,
    onColumnResizeEnd: PropTypes.func,
    onColumnReorderStart: PropTypes.func,
    onColumnReorderEnd: PropTypes.func,
    onRowsRequest: PropTypes.func,
    onRowsReset: PropTypes.func,
    onRowsChange: PropTypes.func,
    onTotalRowsChange: PropTypes.func,
};

export default GridTable;

export * from "./components";
export * from "./hooks";
