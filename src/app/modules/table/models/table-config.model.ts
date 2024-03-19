export interface TableConfig {
    showActions ?: boolean
    showActionsConfig : ShowActionsConfig
}

interface ShowActionsConfig {
    editar ?: boolean
    eliminar ?: boolean
    crear ?: boolean
    observar ?: boolean
}