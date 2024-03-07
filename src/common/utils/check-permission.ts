import { Permission, PermissionGroup } from "../enum/permission.enum";

export default (
  permission: Permission,
  group: PermissionGroup,
  authPermission: string[]
): boolean => authPermission.includes(`${group}:${permission}`);
