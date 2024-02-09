import BarIcon from "../../../components/icons/BarIcon";
import CloseIcon from "../../../components/icons/CloseIcon";

export default function () {
  return (
    <button
      data-drawer-target="drawer-navigation"
      data-drawer-toggle="drawer-navigation"
      aria-controls="drawer-navigation"
      class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition"
    >
      <BarIcon class="w-6 h-6" />
      <CloseIcon class="hidden w-4 h-4" />
      <span class="sr-only">Toggle sidebar</span>
    </button>
  );
}
