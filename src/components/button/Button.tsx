import { JSX, ParentProps, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import LoadingIcon from "../icons/LoadingIcon";
import "./Button.scss";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  color?: "primary" | "secondary" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  prefixIcon?: (
    props: ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>>
  ) => JSX.Element;
  subfixIcon?: (
    props: ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>>
  ) => JSX.Element;
}

export default (props: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={props.disabled || props.isLoading}
      type={props.type}
      class={`button button-${props.color || "primary"} button-${
        props.size || "md"
      } ${props.class} `}
    >
      <Show when={props.prefixIcon && !props.isLoading}>
        <Dynamic component={props.prefixIcon} class="me-2" />
      </Show>

      <Show when={props.isLoading} fallback={props.children}>
        <>
          <LoadingIcon class="button-loading" />
          Loading...
        </>
      </Show>

      <Show when={props.subfixIcon && !props.isLoading}>
        <Dynamic component={props.subfixIcon} class="ms-2" />
      </Show>
    </button>
  );
};
