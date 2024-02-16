import { Match, ParentProps, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import ChevronDownIcon from "../../icons/ChevronDownIcon";
import ChevronSortIcon from "../../icons/ChevronSortIcon";
import ChevronUpIcon from "../../icons/ChevronUpIcon";

export interface TableHeaderProps extends ParentProps {
  label: string;
  key: string;
  sortOrder: "asc" | "desc" | undefined;
  ordered?: boolean;
  onSort?: (sort: HeaderState) => void;
}

export interface HeaderState {
  key: string;
  sortOrder: "asc" | "desc" | undefined;
}

export default (props: TableHeaderProps) => {
  return (
    <th scope="col" class="px-4 py-3">
      <Switch>
        <Match when={props.ordered}>
          <div class="flex items-center">
            {props.label}
            <Dynamic
              component={
                props?.sortOrder === "asc"
                  ? ChevronDownIcon
                  : props.sortOrder === "desc"
                  ? ChevronUpIcon
                  : ChevronSortIcon
              }
              class="w-3 h-3 ms-1.5 cursor-pointer"
              classList={{
                "text-primary-500":
                  props.sortOrder === "asc" || props.sortOrder === "desc",
              }}
              onClick={() => {
                if (props.onSort)
                  props.onSort({ key: props.key, sortOrder: props.sortOrder });
              }}
            />
          </div>
        </Match>

        <Match when={!props.ordered}>{props.label}</Match>
      </Switch>
    </th>
  );
};
