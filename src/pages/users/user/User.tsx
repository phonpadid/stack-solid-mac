import { createEffect, createResource, createSignal } from "solid-js";
import { IOffsetBasePaginate } from "../../../common/interface/pagination";
import Avatar from "../../../components/avatar/Avatar";
import Dropdown from "../../../components/dropdown/Dropdown";
import DotsHorizontalIcon from "../../../components/icons/DotsHorizontalIcon";
import Table from "../../../components/table/Table";
import { TableHeader } from "../../../components/table/Table.interface";
import getUserApi from "./api/get-user.api";
import { UserResponse } from "./api/response.interface";

export default () => {
  const tableHeaders: TableHeader[] = [
    { key: "user", label: "user" },
    { key: "role", label: "role" },
    { key: "status", label: "status" },
    { key: "last_login", label: "last login" },
  ];

  const [state, setState] = createSignal<IOffsetBasePaginate>({
    offset: 0,
    limit: 10,
  });

  const [users, { mutate }] = createResource(state, getUserApi);

  createEffect(() => {
    if (users.state === "ready") {
      mutate((prev) =>
        prev
          ? {
              ...prev,
              data: {
                total: prev.data.total,
                users: prev.data.users.map((val) => {
                  const { id, image, firstName, lastName } =
                    val as UserResponse;

                  return {
                    id,
                    user: (
                      <div class="flex items-center">
                        <Avatar
                          src={image}
                          alt="image"
                          size="sm"
                          class="mr-3"
                        />
                        <span>
                          {firstName} {lastName}
                        </span>
                      </div>
                    ),
                    role: (
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        admin
                      </span>
                    ),
                    status: (
                      <div class="flex items-center font-medium">
                        <span class="w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full mr-2"></span>
                        <span>Active</span>
                      </div>
                    ),
                    last_login: new Date().toDateString(),
                  };
                }),
              },
            }
          : prev
      );
    }
  });

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
    <Table
      tableHeaders={tableHeaders}
      data={users()?.data.users}
      paginate={{
        offset: 0,
        limit: 10,
      }}
      total={users()?.data.total}
      isLoading={users.loading}
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
      onChange={(state) => {
        setState(() => ({
          offset: state.paginate.offset,
          limit: state.paginate.limit,
        }));
      }}
    />
  );
};
