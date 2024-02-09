import { Meta, StoryObj } from "storybook-solidjs";
import "./Table.scss";
import TableHeader from "./TableHeader";

const meta = {
  title: "Example/Table/TableHeader",
  component: TableHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof TableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return (
      <div class="table">
        <div class="table-container">
          <table class="table-content">
            <thead class="table-thead">
              <tr>
                <TableHeader key="name" label="Name" />
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  },
};

export const Sorter: Story = {
  render() {
    return (
      <div class="table">
        <div class="table-container">
          <table class="table-content">
            <thead class="table-thead">
              <tr>
                <TableHeader key="name" label="Name" ordered />
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  },
};

export const WithAction: Story = {
  render() {
    return (
      <div class="table">
        <div class="table-container">
          <table class="table-content">
            <thead class="table-thead">
              <tr>
                <TableHeader key="name" label="Name" ordered />
                <TableHeader key="age" label="age" ordered />
                <TableHeader key="action" label="action" action />
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  },
};
