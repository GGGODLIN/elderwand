export const AuthWhitelist: RegExp[] = [
    /^\/$/, // index
    /^\/_next\/static/,
    /^\/login/,
    /^\/logout/,
    /^\/register/,
    /^\/api\/login/,
    /^\/api\/logout/,
    /^\/api\/invite\/user/,
    /^\/api\/register/,
];
