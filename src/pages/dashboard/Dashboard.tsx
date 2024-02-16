import Button from "../../components/button/Button";
import Dropdown from "../../components/dropdown/Dropdown";
import DotsHorizontalIcon from "../../components/icons/DotsHorizontalIcon";
import PlusIcon from "../../components/icons/PlusIcon";
import SearchIcon from "../../components/icons/SearchIcon";
import Table, { TableDataParent } from "../../components/table/Table";
import { TableHeaderProps } from "../../components/table/TableHeader";

export default () => {
  const tableHeaders: TableHeaderProps[] = [
    { key: "name", label: "product name", ordered: true },
    { key: "category", label: "category", ordered: true },
    { key: "brand", label: "brand", ordered: true },
    { key: "description", label: "description", ordered: true },
    { key: "price", label: "price", ordered: true },
  ];

  const tableData: TableDataParent[] = [
    {
      id: "1",
      name: "Apple iMac",
      category: "PC",
      brand: "Apple",
      description: "300",
      price: 2999,
    },
    {
      id: "2",
      name: "Apple iPhone 14",
      category: "Phone",
      brand: "Apple",
      description: "1237",
      price: 999,
    },
  ];

  return (
    <>
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
        onChange={(state) => {
          console.log(state);
        }}
        data={tableData}
        actionColumn={(key) => (
          <Dropdown
            triggerEl={
              <span class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100">
                <DotsHorizontalIcon class="w-5 h-5" />
              </span>
            }
            menus={[
              [
                {
                  onClick() {
                    console.log("Edit: ", key);
                  },
                  label: "Edit",
                },
                {
                  onClick() {
                    console.log("Show: ", key);
                  },
                  label: "Show",
                },
              ],
              [
                {
                  onClick() {
                    console.log("Delete: ", key);
                  },
                  label: "Delete",
                },
              ],
            ]}
          />
        )}
        paginate={{ currentPage: 1, pageSize: 10, total: 100 }}
      />
    </>
  );
};
