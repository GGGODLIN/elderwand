export interface PaginationDTO<T> {
    offset: number
    limit: number
    total: number
    results: Array<T>
}
