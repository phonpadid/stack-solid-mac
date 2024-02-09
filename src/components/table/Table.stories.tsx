import { Meta, StoryObj } from "storybook-solidjs";
import Button from "../button/Button";
import PlusIcon from "../icons/PlusIcon";
import SearchIcon from "../icons/SearchIcon";
import Table from "./Table";
import { TableHeaderProps } from "./TableHeader";

const meta = {
  title: "Example/Table/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

interface TableData {
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
}

export const Default: Story = {
  render() {
    const tableHeaders: TableHeaderProps[] = [
      { key: "name", label: "product name", ordered: true },
      { key: "category", label: "Category", ordered: true },
      { key: "brand", label: "Brand", ordered: true },
      { key: "description", label: "Description", ordered: true },
      { key: "price", label: "Price", ordered: true },
      { key: "action", label: "action", action: true },
    ];

    const tableData: TableData[] = [
      {
        name: "Apple iMac",
        category: "PC",
        brand: "Apple",
        description: "300",
        price: 2999,
      },
      {
        name: "Apple iPhone 14",
        category: "Phone",
        brand: "Apple",
        description: "1237",
        price: 999,
      },
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
                  <Button prefixIcon={PlusIcon}>Add product</Button>
                </div>
              </>
            }
            tableHeaders={tableHeaders}
            onChange={(state) => {
              console.log(state);
            }}
            data={tableData}
          ></Table>
        </div>
      </section>
    );
  },
};
