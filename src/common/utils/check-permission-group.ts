import { PermissionGroup } from "../enum/permission.enum";

export default (group: PermissionGroup, authPermission: string[]): boolean =>
  extractGroup(authPermission).includes(group);

function extractGroup(permissions: string[]): string[] {
  const GroupSet: Set<string> = new Set();
  permissions.forEach((permission) => {
    const category = permission.split(":")[0];
    GroupSet.add(category);
  });
  return Array.from(GroupSet);
}
