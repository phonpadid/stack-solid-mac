import { JSX, ParentProps } from "solid-js";

export default function (
  props: ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 12h14m-7 7V5"
      />
    </svg>
  );
}
