const AuthWhitelist: RegExp[] = [
    /^\/$/, // index
    /^\/_next\/static/,

    /^\/api\/info/,
    /^\/login/,
    /^\/logout/,
    /^\/register/,
    /^\/api\/login/,
    /^\/api\/logout/,
    /^\/api\/invitation\/user/,
    /^\/api\/register/,

    // hardware
    /^\/api\/gateway/,
    /^\/api\/devices\/.*\/repository/,
    /^\/api\/v2\/devices\/.*\/repository/,
];

export default AuthWhitelist;
