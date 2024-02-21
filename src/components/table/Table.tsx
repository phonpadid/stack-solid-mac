import { Pagination } from "@ark-ui/solid";
import { For, ParentProps, Show, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import { fadeIn, fadeOut } from "../../utils/transition-animation";
import LoadingIcon from "../icons/LoadingIcon";
import { TableProps, TableState } from "./Table.interface";
import TablePlaceholder from "./TablePlaceholder";
import TableBody from "./table-body/TableBody";
import TableHeader, { TableHeaderProps } from "./table-header/TableHeader";

export default (props: ParentProps<TableProps>) => {
  let tableRow: HTMLTableRowElement | undefined;

  const [table, setTable] = createStore<{
    state: TableState;
  }>({
    state: {
      paginate: props.paginate,
      order: undefined,
    },
  });

  const [orderHeader, setOrderHeader] = createStore<{
    orders: TableHeaderProps[];
  }>({
    orders: props.tableHeaders.map((value) => ({
      ...value,
      sortOrder: undefined,
    })),
  });

  onMount(() => {
    const emptyRows = document.getElementById("empty-row");

    if (emptyRows) {
      emptyRows.style.height = `${
        54 * props.paginate.limit - (props.data ? props.data.length : 0)
      }px`;
    }
  });

  return (
    <div class="table-main">
      <Show when={props.header}>
        {(header) => <div class="table-header">{header()}</div>}
      </Show>

      <div class="table-container">
        <TablePlaceholder />

        <table class="table-content">
          <thead class="table-thead">
            <tr>
              <For each={orderHeader.orders}>
                {(column, idx) => (
                  <TableHeader
                    {...column}
                    onSort={(sort) => {
                      setOrderHeader("orders", idx(), "sortOrder", (prev) => {
                        if (prev === "asc") {
                          return "desc";
                        } else if (prev === "desc") {
                          return undefined;
                        } else {
                          return "asc";
                        }
                      });

                      setOrderHeader(
                        "orders",
                        orderHeader.orders
                          .map((val, index) => index)
                          .filter((val) => val !== idx()),
                        (prev) => ({
                          ...prev,
                          sortOrder: undefined,
                        })
                      );

                      setTable("state", (prev) => ({
                        paginate: prev.paginate,
                        order: orderHeader.orders[idx()].sortOrder
                          ? {
                              key: column.key,
                              sortOrder: orderHeader.orders[idx()].sortOrder,
                            }
                          : undefined,
                      }));

                      if (props.onChange) props.onChange(table.state);
                    }}
                  />
                )}
              </For>

              <Show when={props.actionColumn}>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </Show>
            </tr>
          </thead>

          <tbody>
            <For each={props.data}>
              {(record) => (
                <Show when={record} fallback={<tr class="empty-row"></tr>}>
                  {(data) => (
                    <tr class="table-tbody" ref={tableRow}>
                      <For each={orderHeader.orders}>
                        {(column, headerIdx) => (
                          <TableBody
                            data={data()[column.key]}
                            isTh={headerIdx() === 0}
                          />
                        )}
                      </For>

                      <Show when={props.actionColumn}>
                        {(action) => (
                          <td class="px-4 py-3">{action()(data().id)}</td>
                        )}
                      </Show>
                    </tr>
                  )}
                </Show>
              )}
            </For>

            <Show when={(props.data ? props.data.length : 0) < 10}>
              <tr id="empty-row"></tr>
            </Show>
          </tbody>

          <Transition onEnter={fadeIn} onExit={fadeOut}>
            <Show when={props.isLoading}>
              <div
                class={`absolute z-20 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
              >
                <div>
                  <LoadingIcon class="animate-spin w-8 h-8" />
                </div>
              </div>
            </Show>
          </Transition>
        </table>
      </div>

      <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {table.state.paginate.offset + 1}-
            {props.total
              ? Math.min(
                  table.state.paginate.offset + table.state.paginate.limit,
                  props.total
                )
              : ""}{" "}
          </span>
          of{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {props.total}
          </span>
        </span>

        <Show when={props.total}>
          {(total) => (
            <Pagination.Root
              class="inline-flex -space-x-px text-sm"
              count={total()}
              pageSize={table.state.paginate.limit}
              onPageChange={(details) => {
                setTable("state", (prev) => ({
                  ...prev,
                  paginate: {
                    offset: (details.page - 1) * details.pageSize,
                    limit: details.pageSize,
                  },
                }));

                if (props.onChange) props.onChange(table.state);
              }}
            >
              {() => (
                <>
                  <Pagination.PrevTrigger class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                  </Pagination.PrevTrigger>
                  <Pagination.NextTrigger class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                  </Pagination.NextTrigger>
                </>
              )}
            </Pagination.Root>
          )}
        </Show>
      </nav>
    </div>
  );
};
