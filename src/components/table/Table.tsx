import { For, ParentProps, Show, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import { getPaginateEnd, getPaginateStart } from "../../utils/paginate";
import { fadeIn, fadeOut } from "../../utils/transition-animation";
import LoadingIcon from "../icons/LoadingIcon";
import Pagination from "../pagination/Pagination";
import { ReturnTableState, TableProps, TableState } from "./Table.interface";
import "./Table.scss";
import TablePlaceholder from "./TablePlaceholder";
import TableBody from "./table-body/TableBody";
import TableHeader, { TableHeaderProps } from "./table-header/TableHeader";

export default (props: ParentProps<TableProps>) => {
  let tableRow: HTMLTableRowElement | undefined;

  const start = getPaginateStart(props.paginate.page, props.paginate.limit);

  const [table, setTable] = createStore<{
    state: TableState;
    returnState: ReturnTableState;
  }>({
    state: {
      paginate: {
        start,
        end: getPaginateEnd(start, props.paginate.limit, props.paginate.total),
        page: props.paginate.page,
      },
    },
    returnState: {
      paginate: { page: props.paginate.page, limit: props.paginate.limit },
      order: undefined,
    },
  });

  const [orderHeader, setOrderHeader] = createStore<{
    orders: TableHeaderProps[];
  }>({
    orders: props.tableHeaders
      .filter((value) => value.ordered)
      .map((value) => ({
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

                      setTable("returnState", () => ({
                        paginate: {
                          page: table.state.paginate.page,
                          limit: props.paginate.limit,
                        },
                        order: orderHeader.orders[idx()].sortOrder
                          ? {
                              key: column.key,
                              sortOrder: orderHeader.orders[idx()].sortOrder,
                            }
                          : undefined,
                      }));

                      if (props.onChange) props.onChange(table.returnState);
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
            {table.state.paginate.start}-{table.state.paginate.end}{" "}
          </span>
          of{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {props.paginate.total}
          </span>
        </span>

        <Pagination
          count={props.paginate.total}
          pageSize={props.paginate.limit}
          page={props.paginate.page}
          siblingCount={1}
          onPageChange={(details) => {
            const start = getPaginateStart(details.page, details.pageSize);

            setTable("state", "paginate", () => ({
              start: start,
              end: getPaginateEnd(
                start,
                details.pageSize,
                props.paginate.total
              ),
              page: details.page,
            }));

            setTable("returnState", (prev) => ({
              ...prev,
              paginate: {
                page: table.state.paginate.page,
                limit: props.paginate.limit,
              },
            }));

            if (props.onChange) props.onChange(table.returnState);
          }}
        />
      </nav>
    </div>
  );
};
