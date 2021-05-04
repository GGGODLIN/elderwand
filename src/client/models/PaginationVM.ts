export interface PaginationVM<T> {
    offset: number
    limit: number
    total: number
    results: Array<T>
}
