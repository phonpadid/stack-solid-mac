import { ParentProps, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { fadeIn, fadeOut } from "../../utils/transition-animation";
import LoadingIcon from "../icons/LoadingIcon";

type AvatarProps = ParentProps<{
  size: "xs" | "sm" | "md" | "lg" | "xl";
  src?: string;
  alt: string;
  isLoading?: boolean;
  class?: string;
}>;

export default (props: AvatarProps) => {
  return (
    <div
      class={`relative overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${props.class}`}
      classList={{
        "w-6 h-6": props.size === "xs",
        "w-8 h-8": props.size === "sm",
        "w-10 h-10": props.size === "md",
        "w-20 h-20": props.size === "lg",
        "w-36 h-36": props.size === "xl",
      }}
    >
      <Show
        when={props.src}
        fallback={
          <svg
            class="absolute text-gray-400 -left-1"
            classList={{
              "w-8 h-8": props.size === "xs",
              "w-10 h-10": props.size === "sm",
              "w-12 h-12": props.size === "md",
              "w-[5.5rem] h-[5.5rem]": props.size === "lg",
              "w-[9.5rem] h-[9.5rem]": props.size === "xl",
            }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        }
      >
        {(src) => (
          <img
            class="rounded-full"
            classList={{
              "w-6 h-6": props.size === "xs",
              "w-8 h-8": props.size === "sm",
              "w-10 h-10": props.size === "md",
              "w-20 h-20": props.size === "lg",
              "w-36 h-36": props.size === "xl",
            }}
            src={src()}
            alt={props.alt}
          />
        )}
      </Show>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={props.isLoading}>
          <div
            class={`absolute z-20 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
          >
            <div>
              <LoadingIcon
                class="animate-spin"
                classList={{
                  "w-2 h-2": props.size === "xs",
                  "w-4 h-4": props.size === "sm",
                  "w-5 h-5": props.size === "md",
                  "w-9 h-9": props.size === "lg",
                  "w-16 h-16": props.size === "xl",
                }}
              />
            </div>
          </div>
        </Show>
      </Transition>
    </div>
  );
};
