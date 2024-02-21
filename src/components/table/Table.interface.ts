import { JSXElement } from "solid-js";
import { HeaderState, TableHeaderProps } from "./table-header/TableHeader";

export interface TableDataParent {
  id: string | number;
}

export interface TableHeader extends Omit<TableHeaderProps, "sortOrder"> {}

export interface TableProps {
  header?: JSXElement;
  tableHeaders: TableHeader[];
  data?: TableDataParent[];
  total?: number;
  paginate: { limit: number; offset: number };
  actionColumn?: (key: string | number) => JSXElement;
  onChange?: (state: TableState) => void;
  isLoading?: boolean;
}

export interface TableState {
  order?: HeaderState;
  paginate: { offset: number; limit: number };
}
