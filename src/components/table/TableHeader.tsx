import { JSX, Match, ParentProps, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronSortIcon from "../icons/ChevronSortIcon";
import ChevronUpIcon from "../icons/ChevronUpIcon";

export interface TableHeaderProps
  extends ParentProps<JSX.ThHTMLAttributes<HTMLTableCellElement>> {
  label: string;
  key: string;
  ordered?: boolean;
  action?: boolean;
  onSort?: (sort: HeaderState) => void;
}

export interface HeaderState {
  key: string;
  sortOrder: "asc" | "desc" | undefined;
}

export default (props: TableHeaderProps) => {
  const [state, setState] = createStore<{ order: HeaderState }>({
    order: { key: props.key, sortOrder: undefined },
  });

  return (
    <th scope="col" class="px-4 py-3">
      <Switch>
        <Match when={props.ordered && !props.action}>
          <div class="flex items-center">
            {props.label}
            <Dynamic
              component={
                state.order.sortOrder === "asc"
                  ? ChevronDownIcon
                  : state.order.sortOrder === "desc"
                  ? ChevronUpIcon
                  : ChevronSortIcon
              }
              class="w-3 h-3 ms-1.5 cursor-pointer"
              classList={{
                "text-primary-500":
                  state.order.sortOrder === "asc" ||
                  state.order.sortOrder === "desc",
              }}
              onClick={() => {
                setState("order", "sortOrder", (prev) => {
                  if (prev === "asc") {
                    return "desc";
                  } else if (prev === "desc") {
                    return undefined;
                  } else {
                    return "asc";
                  }
                });

                if (props.onSort) props.onSort(state.order);
              }}
            />
          </div>
        </Match>

        <Match when={!props.ordered && !props.action}>{props.label}</Match>

        <Match when={props.action}>
          <span class="sr-only">Actions</span>
        </Match>
      </Switch>
    </th>
  );
};
