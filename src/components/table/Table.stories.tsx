import { JSXElement, createResource, createSignal } from "solid-js";
import { Meta, StoryObj } from "storybook-solidjs";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import DotsHorizontalIcon from "../icons/DotsHorizontalIcon";
import PlusIcon from "../icons/PlusIcon";
import SearchIcon from "../icons/SearchIcon";
import Table from "./Table";
import {  ReturnTableState, TableDataParent, TableHeader } from "./Table.interface";

const meta = {
  title: "Example/Table/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const fetchProduct = async (state: ReturnTableState): Promise<ProductData[]> => {
  const url = new URL("https://65cd8575c715428e8b3e8964.mockapi.io/products");
  url.searchParams.append("page", String(state.paginate.page));
  url.searchParams.append("limit", String(state.paginate.limit));
  if (state.order) {
    url.searchParams.append("sortBy", state.order.key);
    url.searchParams.append(
      "order",
      state.order.sortOrder ? state.order.sortOrder : "asc"
    );
  }

  const response = await fetch(url, {
    headers: { "content-type": "application/json" },
  });

  return await response.json();
};

interface ProductData extends TableDataParent {
  name: string;
  category: string;
  brand: string;
  description: string;
  price: JSXElement;
}

export const Default: Story = {
  render() {
    const tableHeaders: TableHeader[] = [
      { key: "name", label: "product name", ordered: true },
      { key: "category", label: "category", ordered: true },
      { key: "brand", label: "brand", ordered: true },
      { key: "description", label: "description", ordered: true },
      { key: "price", label: "price", ordered: true },
    ];

    const [state, setState] = createSignal<ReturnTableState>({
      paginate: { page: 1, limit: 10 },
    });

    const [products] = createResource(state, fetchProduct);

    const actionMenus = (id: string | number) => [
      [
        {
          onClick() {
            console.log("Edit: ", id);
          },
          label: "Edit",
        },
        {
          onClick() {
            console.log("Show: ", id);
          },
          label: "Show",
        },
      ],
      [
        {
          onClick() {
            console.log("Delete: ", id);
          },
          label: "Delete",
        },
      ],
    ];

    return (
      <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          <Table
            header={
              <>
                <div class="w-full md:w-1/2">
                  <form class="flex items-center">
                    <label for="simple-search" class="sr-only">
                      Search
                    </label>
                    <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        class="transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <Button prefixIcon={<PlusIcon />}>Add product</Button>
                </div>
              </>
            }
            tableHeaders={tableHeaders}
            onChange={(tableState) => {
              setState((prev) => ({
                paginate: tableState.paginate,
                order: tableState.order,
              }));
              console.log(state());
            }}
            data={products()}
            paginate={{
              page: 1,
              limit: 10,
              total: 100,
            }}
            isLoading={products.loading}
            actionColumn={(id) => (
              <Dropdown
                triggerEl={
                  <span class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100">
                    <DotsHorizontalIcon class="w-5 h-5" />
                  </span>
                }
                menus={actionMenus(id)}
              />
            )}
          />
        </div>
      </section>
    );
  },
};
