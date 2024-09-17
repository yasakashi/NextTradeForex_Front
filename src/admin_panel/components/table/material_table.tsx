import React, { ElementType, ReactNode } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowData,
  useMaterialReactTable,
} from "material-react-table";
import {
  loading_selector,
  useAppSelector,
} from "../../../redux/features/generalSlice";

interface Props<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  rows?: T[];
  RenderTopCustom?: ElementType;
}
const MAterialTable = <T extends MRT_RowData>({
  rows,
  columns,
  RenderTopCustom,
}: Props<T>) => {
  const loading = useAppSelector(loading_selector);
  const table = useMaterialReactTable({
    data: rows || [],
    renderTopToolbarCustomActions: ({table}:{ table:any }) =>
      RenderTopCustom ? <RenderTopCustom table={table} /> : <></>,
    columns: columns,
    state: { showLoadingOverlay: loading, showSkeletons: loading },
    enableStickyHeader: true,
    positionGlobalFilter: "left",
    enableHiding: true,
    editDisplayMode: "modal",
    enableToolbarInternalActions: true,
    enableRowSelection: true,
    positionPagination: "bottom",
    layoutMode: "semantic",
    muiDetailPanelProps: { style: { padding: 0 } },
    enableColumnActions: false,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enablePagination: true,
    enableBottomToolbar: true,
    enableTopToolbar: true,
    enableFilters: true,
    positionExpandColumn: "last",
    positionActionsColumn: "last",
    paginationDisplayMode: "default",

    autoResetAll: false,
    muiSkeletonProps: { style: { display: "none" } },
    muiTablePaperProps: {
      sx: {
        height: 920,
        backgroundColor: (t) => t.palette.background.paper,
        boxShadow: "none",
      },
    },
    initialState: { showGlobalFilter: true },

    muiTopToolbarProps: {
      sx: {
        mb: 0,
        backgroundColor: (t:any) => t.palette.background.paper,
        padding: 0,
        // height:140,
      },
    },

    muiTableBodyRowProps: {
      hover: true,
      sx: {
        // zIndex:t=>t.zIndex.drawer-1,
        backgroundColor: (t:any) => t.palette.background.paper,
      },
    },
    muiSearchTextFieldProps: {
      variant: "standard",
      color: "primary",
      placeholder: "",
      label: "Search",
      InputLabelProps: { shrink: true },
    },
    muiBottomToolbarProps: {
      sx: { height: 0, bgcolor: (t) => t.palette.background.paper },
    },
    muiTableContainerProps: {
      sx: {
        backgroundColor: (t:any) => t.palette.background.paper,
        // height: `calc(100% - ${78}px)`,
        height: 800,
        borderRadius: 1,
        scrollbarGutter: "stable",

        borderLeft: (t:any) =>
          `2px solid ${
            t.palette.mode === "dark"
              ? t.palette.background.default
              : t.palette.background.default
          }`,
        borderRight: (t:any) =>
          `2px solid ${
            t.palette.mode === "dark"
              ? t.palette.background.default
              : t.palette.background.default
          }`,
      },
    },

    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      showRowsPerPage: true,

      variant: "outlined",
    },
  });
  return <MaterialReactTable table={table} />;
};

export default MAterialTable;
export const data_list = [
  {
    name: " Trade",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Learn ",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Commen sense",
    description: "Learn to trade finaneail market",
    count: 2,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "finance",
    description: "Learn to trade finaneail market",
    count: 21,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Parent to child",
    description: "Learn to trade finaneail market",
    count: 10,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "This is it",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: " Trade for life",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Learn to Trade",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Learn to Trade",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Learn to Trade",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Learn to Trade",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Learn to Trade",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Learn to Trade",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
  {
    name: "Learn to Trade",
    description: "Learn to trade finaneail market",
    count: 25,
    isVisible: true,
    visible_to_dropdown: false,
    slug: "this ths slug for test",
  },
];
