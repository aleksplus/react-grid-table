import React, { useCallback, useMemo, forwardRef } from "react";
import { getHighlightedText } from "../utils";

const CellContainer = forwardRef(function CellContainerForwardRef(
    {
        rowId,
        data,
        column,
        rowIndex,
        colIndex,
        isEdit,
        disableSelection,
        isSelected,
        tableManager,
    },
    forwardRef
) {
    let {
        id,
        config: {
            highlightSearch,
            tableHasSelection,
            additionalProps: { cellContainer: additionalProps = {} },
        },
        rowsApi: { onRowClick },
        rowEditApi: { editRow, setEditRow },
        rowSelectionApi: { toggleRowSelection },
        searchApi: { searchText, valuePassesSearch },
        columnsApi: { visibleColumns },
        isLoading,
    } = tableManager;

    const getClassNames = () => {
        let classNames;
        const additionalPropsClassName =
            typeof additionalProps.className === "function"
                ? additionalProps.className(data, column)
                : additionalProps.className;
        const all = `rgt-cell rgt-row-${rowIndex} rgt-row-${
            rowIndex % 2 === 0 ? "even" : "odd"
        }${isSelected ? " rgt-row-selected" : ""}${
            isEdit ? " rgt-row-edit" : ""
        } ${additionalPropsClassName || ""}`.trim();
        const virtualDefault = `${
            !tableHasSelection
                ? ""
                : disableSelection
                ? " rgt-row-not-selectable"
                : " rgt-row-selectable"
        }`;
        const checkboxDefault = `${
            column.pinned && colIndex === 0
                ? " rgt-cell-pinned rgt-cell-pinned-left"
                : ""
        }${
            column.pinned && colIndex === visibleColumns.length - 1
                ? " rgt-cell-pinned rgt-cell-pinned-right"
                : ""
        } ${column.className}`.trim();

        switch (column.id) {
            case "virtual":
                classNames = `${all} rgt-cell-virtual ${virtualDefault}`;
                break;
            case "checkbox":
                classNames = `${all} rgt-cell-checkbox ${checkboxDefault}`;
                break;
            default:
                classNames = `${all} rgt-cell-${column.field} ${virtualDefault} ${checkboxDefault}`;
        }

        return classNames;
    };

    const getValue = () => {
        let value;

        switch (column.id) {
            case "checkbox":
                value = isSelected;
                break;
            default:
                value =
                    data &&
                    column
                        .getValue?.({
                            tableManager,
                            value: isEdit
                                ? editRow[column.field]
                                : data[column.field],
                            column,
                        })
                        ?.toString?.();
                if (
                    !isEdit &&
                    highlightSearch &&
                    valuePassesSearch(value, column)
                )
                    return getHighlightedText(value, searchText);
        }

        return value;
    };

    const onMouseOver = useCallback(
        (event) => {
            document
                .querySelectorAll(`#${id} .rgt-row-${rowIndex}`)
                .forEach((cell) => cell.classList.add("rgt-row-hover"));
            additionalProps.onMouseOver?.(event);
        },
        [id, rowIndex, additionalProps]
    );

    const onMouseOut = useCallback(
        (event) => {
            document
                .querySelectorAll(`#${id} .rgt-row-${rowIndex}`)
                .forEach((cell) => cell.classList.remove("rgt-row-hover"));
            additionalProps.onMouseOut?.(event);
        },
        [id, rowIndex, additionalProps]
    );

    if (data && onRowClick) {
        additionalProps = {
            onClick: (event) =>
                onRowClick(
                    { rowIndex, data, column, isEdit, event },
                    tableManager
                ),
            ...additionalProps,
        };
    }

    let classNames = getClassNames();
    let value = getValue();

    const cellProps = React.useMemo(
        () => ({
            tableManager,
            value,
            data,
            column,
            colIndex,
            rowIndex,
            loading: isLoading,
        }),
        [tableManager, value, data, column, colIndex, rowIndex, isLoading]
    );
    const isFirstEditableCell = useMemo(
        () =>
            visibleColumns.findIndex(
                (visibleColumn) =>
                    visibleColumn.id !== "checkbox" &&
                    visibleColumn.editable !== false
            ) === colIndex,
        [visibleColumns, colIndex]
    );

    const Cell = column.cellRenderer;
    const CellPlaceholder = column.placeHolderRenderer;
    const CellEdit = column.editorCellRenderer;

    return (
        <div
            data-row-id={rowId.toString()}
            data-row-index={rowIndex.toString()}
            data-column-id={column.id.toString()}
            data-column-index={colIndex}
            {...additionalProps}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            className={classNames}
            ref={forwardRef}
        >
            {column.id === "virtual" ? null : column.id === "checkbox" ? (
                <Cell
                    {...cellProps}
                    onChange={() => toggleRowSelection(rowId)}
                    disabled={disableSelection}
                />
            ) : !data ? (
                <CellPlaceholder {...cellProps} />
            ) : column.editable && isEdit ? (
                <CellEdit
                    {...cellProps}
                    onChange={setEditRow}
                    isFirstEditableCell={isFirstEditableCell}
                />
            ) : (
                <Cell {...cellProps} />
            )}
        </div>
    );
});

export default CellContainer;
