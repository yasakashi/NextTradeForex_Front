import React from "react";
import {
  MaterialReactTable,
  MRT_Row,
  useMaterialReactTable,
} from "material-react-table";
import BorderedButtonPrimary from "../../../../../common/bordered_button_primary";
import CustomRadioButton from "./customRadioButton";
import { useNavigate } from "react-router-dom";
import DeleteMenuModal from "./delete_menu_modal";
import {
  loading_selector,
  useAppSelector,
} from "../../../../../redux/features/generalSlice";
const CategoriesTable = ({ data }: { data: any[] }) => {
  const [open_delete_dialog, set_open_delete_dialog] = React.useState<{
    open: boolean;
    row?: MRT_Row<any>;
  }>({ open: false });
  const navigate = useNavigate();
  const loading = useAppSelector(loading_selector);
  const table = useMaterialReactTable({
    data: data,

    columns: [
      {
        header: "Name",
        accessorKey: "name",
        Cell: ({ row, rowRef, table }) => {
          return (
            <div className="relative min-w-20" style={{ minWidth: 190 }}>
              <h5 className="text-blue-600">{row.original.name}</h5>
              <div className="flex items-center">
                {row.id === open_delete_dialog?.row?.id && (
                  <DeleteMenuModal
                    disabled={false}
                    onYesClick={() => {
                      set_open_delete_dialog({ open: false, row: undefined });
                    }}
                    props={{
                      open: open_delete_dialog.open,
                      onClose() {
                        set_open_delete_dialog({ open: false, row: undefined });
                      },
                    }}
                  />
                )}
                <BorderedButtonPrimary
                  title="Edit"
                  onClick={() => {
                    navigate(
                      `/admin-panel/lesson/categories/edit/${row.original.name}`
                    );
                  }}
                  style={{ padding: 4, border: "none" }}
                />
                <BorderedButtonPrimary
                  title="Quick Edit"
                  onClick={() => {
                    table.setEditingRow(row);
                  }}
                  style={{ padding: 4, border: "none" }}
                />

                <BorderedButtonPrimary
                  title="View"
                  onClick={() => {
                    navigate(`/learn_to_trade/${row.original.name}`);

                    // navigate(
                    //   `/admin-panel/lesson/categories/${row.original.slug}`
                    // );
                  }}
                  style={{ padding: 4, border: "none" }}
                />
                <BorderedButtonPrimary
                  title="Delete"
                  onClick={() => {
                    set_open_delete_dialog({ open: true, row });
                  }}
                  style={{ color: "red", padding: 4, border: "none" }}
                />
              </div>
            </div>
          );
        },
      },
      {
        header: "Description",
        accessorKey: "description",
        enableEditing: false,
      },
      { header: "Slug", accessorKey: "slug" },
      { header: "Count", accessorKey: "count", enableEditing: false },
      {
        header: "IsVisible",
        enableEditing: false,
        accessorKey: "isVisible",
        Cell: ({ row }) => {
          return (
            <div className="flex">
              <CustomRadioButton label="Yes" checked={row.original.isVisible} />
              <span className="w-2"></span>
              <CustomRadioButton label="No" />
            </div>
          );
        },
      },
      {
        header: "Visible in dropdown",
        accessorKey: "visible_to_dropdown",
        enableEditing: false,
        Cell: ({ row }) => {
          return (
            <div className="flex">
              <CustomRadioButton label="Yes" />
              <span className="w-2"></span>
              <CustomRadioButton label="No" checked={row.original.isVisible} />
            </div>
          );
        },
      },
    ],
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
        backgroundColor: (t) => t.palette.background.paper,
        padding: 0,
        // height:140,
      },
    },
    muiTableBodyRowProps: {
      hover: true,
      sx: {
        backgroundColor: (t) => t.palette.background.paper,
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
        backgroundColor: (t) => t.palette.background.paper,
        // height: `calc(100% - ${78}px)`,
        height: 800,
        borderRadius: 1,
        scrollbarGutter: "stable",

        borderLeft: (t) =>
          `2px solid ${
            t.palette.mode === "dark"
              ? t.palette.background.default
              : t.palette.background.default
          }`,
        borderRight: (t) =>
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

export default CategoriesTable;
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
