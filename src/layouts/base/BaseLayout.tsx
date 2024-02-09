import { RouteSectionProps } from "@solidjs/router";
import { initDrawers } from "flowbite";
import { createSignal, onMount } from "solid-js";
import Topbar from "./header/Topbar";
import Sidebar from "./sidebar/Sidebar";

export default (props: RouteSectionProps) => {
  const [isSidebarShow, setIsSidebarShow] = createSignal<boolean>(false);
  const [img, setImg] = createSignal<string>("https://i.pravatar.cc/3000");

  onMount(() => {
    initDrawers();
  });

  return (
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
      <Topbar />
      <Sidebar />
      <main class="p-4 md:ml-64 h-auto pt-20">{props.children}</main>;
    </div>
  );
};
