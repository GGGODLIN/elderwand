export default interface RequestBody<T = any> {
    request: {
        body: T;
    };
}
