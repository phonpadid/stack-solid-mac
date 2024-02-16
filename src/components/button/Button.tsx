import { JSX, JSXElement, Show } from "solid-js";
import LoadingIcon from "../icons/LoadingIcon";
import "./Button.scss";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  color?: "primary" | "secondary" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  prefixIcon?: JSXElement;
  subfixIcon?: JSXElement;
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
        <span class="me-2">{props.prefixIcon}</span>
      </Show>

      <Show when={props.isLoading} fallback={props.children}>
        <>
          <LoadingIcon class="button-loading" />
          Loading...
        </>
      </Show>

      <Show when={props.subfixIcon && !props.isLoading}>
        <span class="ms-2">{props.subfixIcon}</span>
      </Show>
    </button>
  );
};
