import { JSXElement } from "solid-js";
import { HeaderState, TableHeaderProps } from "./table-header/TableHeader";

export interface TableDataParent
  extends Record<string, string | number | JSXElement> {
  id: string | number;
}

export interface TableHeader extends Omit<TableHeaderProps, "sortOrder"> {}

export interface TableProps {
  header?: JSXElement;
  tableHeaders: TableHeader[];
  data?: TableDataParent[];
  paginate: { total: number; limit: number; page: number };
  actionColumn?: (key: string | number) => JSXElement;
  onChange?: (state: {
    order?: HeaderState;
    paginate: { page: number; limit: number };
  }) => void;
  isLoading?: boolean;
}

export interface TableState {
  order?: HeaderState;
  paginate: { start: number; end: number; page: number };
}

export interface ReturnTableState {
  paginate: {
    page: number;
    limit: number;
  };
  order?: { key: string; sortOrder: "asc" | "desc" | undefined };
}
