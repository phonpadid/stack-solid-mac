import type { Meta, StoryObj } from "storybook-solidjs";

import AngleDownIcon from "../icons/AngleIcon";
import Avatar from "./Avatar";
import "./Avatar.scss";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    class: { type: "string" },
    name: { type: "string" },
    imageUrl: { type: "string" },
    notification: { type: "number" },
    size: { options: ["bar", "list", "profile"], control: { type: "radio" } },
    status: {
      options: ["online", "offline"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Header: Story = {
  args: {
    name: "Bird",
    size: "bar",
    class: "header__img",
    imageUrl: "https://i.pravatar.cc/3000",
  },
};

export const ListOrTable: Story = {
  args: {
    name: "Bird",
    size: "list",
    imageUrl: "https://i.pravatar.cc/3000",
    status: "online",
    notification: 2,
  },
};

export const Profile: Story = {
  args: {
    name: "Bird",
    size: "profile",
    action: {
      icon: AngleDownIcon,
      onAction: () => {
        console.log("edit");
      },
    },
  },
};
