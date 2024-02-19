import { Meta, StoryObj } from "storybook-solidjs";
import Card from "../../card/Card";
import PasswordInput from "./PasswordInput";

const meta = {
  title: "Example/Form/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div class="flex justify-center">
        <Card class="w-2/4">
          <PasswordInput
            label="password"
            required
            placeholder="enter password"
          />
        </Card>
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <div class="flex justify-center">
        <Card class="w-2/4">
          <PasswordInput
            label="password"
            required
            placeholder="enter password"
            error="invalid format"
          />
        </Card>
      </div>
    );
  },
};
