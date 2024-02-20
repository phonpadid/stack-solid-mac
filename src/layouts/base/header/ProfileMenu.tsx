import { Menu } from "@ark-ui/solid";
import { Show } from "solid-js";
import Avatar from "../../../components/avatar/Avatar";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";

export default function () {
  const auth = useAuth();

  return (
    <Menu.Root>
      <Menu.Trigger class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition">
        <span class="sr-only">Open user menu</span>
        <Avatar
          src={auth.data?.image}
          alt="User Profile"
          size="sm"
          isLoading={auth.loading}
        />
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content class="z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl">
          <Show
            when={!auth.loading}
            fallback={
              <div class="w-full py-3 px-4 flex flex-col justify-center items-center">
                <LoadingIcon class="animate-spin w-8 h-8 mb-2" />
                <p>loading...</p>
              </div>
            }
          >
            <div class="py-3 px-4">
              <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                {auth.data?.username}
              </span>
              <span class="block text-sm text-gray-900 truncate dark:text-white">
                {auth.data?.email}
              </span>
            </div>

            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >
                  My profile
                </a>
              </li>
            </ul>

            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </Show>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
