export interface TableColumn {
    header : string
    field : string
    formatt ?: string
    dataType ?: 'date' | 'object'
}