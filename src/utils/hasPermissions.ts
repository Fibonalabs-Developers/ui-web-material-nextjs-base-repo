interface Config {
    moduleId: number
    key: 'canCreate' | 'canEdit' | 'canDelete' | 'display'
}

export interface PermissionTypes {
    name: string
    canEdit?: boolean
    canCreate?: boolean
    canDelete?: boolean
    display?: boolean
}

export const hasPermissions = (
    permissions: Record<number, PermissionTypes>,
    { moduleId, key }: Config
): boolean => {
    return permissions[moduleId] !== undefined
        ? !!permissions[moduleId][key]
        : false
}
