export default interface RequestToken<T = string> {
    request: {
        token: T;
    };
}
