import { A, useNavigate } from "@solidjs/router";
import { createResource, createSignal } from "solid-js";
import Button from "../../../components/button/Button";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import getRoleApi from "./api/get-role.api";
import { RoleResponse, RoleTableState } from "./api/role.interface";

export default () => {
  const [createUserModal, setCreateUserModal] = createSignal<boolean>(false);

  const navigate = useNavigate();
  const confirm = useConfirm();

  const [state, setState] = createSignal<RoleTableState>({
    offset: 0,
    limit: 10,
  });

  const [roles] = createResource(state, getRoleApi);

  return (
    <Table
      header={
        <div class="flex flex-col items-start justify-between p-4 sm:flex-row sm:items-center">
          <h5 class="font-semibold mb-2 sm:mb-0">All roles</h5>
          <Button
            class="w-full sm:w-fit"
            prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
            onClick={() => {
              navigate("create");
            }}
          >
            Add role
          </Button>
        </div>
      }
      value={roles}
      responseField="roles"
      onChange={({ paginate }) => {
        setState((prev) => ({
          ...prev,
          limit: paginate.limit,
          offset: paginate.offset,
        }));
      }}
    >
      {[
        {
          header: "name",
          body: ({ name }: RoleResponse) => name,
        },
        {
          header: "description",
          body: ({ description }: RoleResponse) => description,
        },
        {
          header: "permissions",
          body: ({ permissions }: RoleResponse) =>
            permissions.map((val) => val.name),
        },
        {
          header: "action",
          body: ({ id }: RoleResponse) => (
            <div class="flex items-center px-6 py-4">
              <A
                href={`users/roles/edit/${id}`}
                class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
              >
                Edit
              </A>
              <a
                href="#"
                onClick={() => {
                  confirm?.showConfirm(
                    "Are you sure you want to delete this item?",
                    {
                      onConfirm: async () => {},
                    },
                    <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                  );
                }}
                class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
              >
                Remove
              </a>
            </div>
          ),
        },
      ]}
    </Table>
  );
};
