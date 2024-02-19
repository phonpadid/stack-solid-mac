import { A, useLocation } from "@solidjs/router";
import { For, JSX, ParentProps, createEffect, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import AngleDownIcon from "../../../components/icons/AngleIcon";

export default (
  props: ParentProps<{
    icon: (
      props: ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>>
    ) => JSX.Element;
    label: string;
    menus: { href: string; label: string }[];
    isOpen: boolean;
    onChange: () => void;
  }>
) => {
  let dropdown: HTMLUListElement | undefined;
  let list: HTMLLIElement | undefined;
  let angleIcon: SVGSVGElement | undefined;
  const location = useLocation();

  const pathname = createMemo(() => location.pathname);

  createEffect(() => {
    if (list && dropdown) {
      if (props.isOpen) {
        list.style.maxHeight = `${dropdown.offsetHeight + 40}px`;
        angleIcon?.classList.add("rotate-180");
      } else {
        list.style.maxHeight = `40px`;
        angleIcon?.classList.remove("rotate-180");
      }
    }
  });

  return (
    <li
      style="max-height: 40px"
      class="max-h-[40px] overflow-hidden transition-all"
      ref={list}
    >
      <button
        type="button"
        class="flex items-center p-2 w-full text-base font-medium rounded-lg transition "
        classList={{
          "sidebar-active": props.menus
            .map(({ href }) => href)
            .includes(pathname()),
          "sidebar-inactive": !props.menus
            .map(({ href }) => href)
            .includes(pathname()),
        }}
        onClick={() => {
          props.onChange();
        }}
      >
        <Dynamic
          component={props.icon}
          class="flex-shrink-0 w-6 h-6 transition"
        />
        <span class="flex-1 ml-3 text-left whitespace-nowrap">
          {props.label}
        </span>
        <AngleDownIcon
          iconDirection="down"
          ref={angleIcon}
          class="w-6 h-6 transition "
        />
      </button>

      <ul ref={dropdown} class="py-2 space-y-2 ">
        <For each={props.menus}>
          {({ href, label }) => (
            <li>
              <A
                href={href}
                class="flex items-center p-2 pl-11 w-full text-base font-medium rounded-lg transition "
                activeClass="sidebar-submenu-active"
                inactiveClass="sidebar-inactive"
              >
                {label}
              </A>
            </li>
          )}
        </For>
      </ul>
    </li>
  );
};
