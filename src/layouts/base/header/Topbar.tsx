import SidebarToggle from "../sidebar/SidebarToggle";
import ProfileMenu from "./ProfileMenu";
import TopbarGlobalSearch from "./TopbarGlobalSearch";
import TopbarGlobalSearchButton from "./TopbarGlobalSearchButton";
import TopbarLogo from "./TopbarLogo";

export default function () {
  return (
    <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-20">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <SidebarToggle />
          <TopbarLogo />
          <TopbarGlobalSearch />
        </div>

        <div class="flex items-center lg:order-2">
          <TopbarGlobalSearchButton />
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
}
