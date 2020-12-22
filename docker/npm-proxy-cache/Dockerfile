# docker pull folha/npm-proxy-cache
FROM folha/npm-proxy-cache

RUN npm install -g npm-proxy-cache

VOLUME /cache

EXPOSE 8080

RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan .visualstudio.com >> ~/.ssh/known_hosts


CMD ["npm-proxy-cache", "-h", "0.0.0.0", "-s", "/cache", "-t", "2592000", "-e" ]

#  npm-proxy-cache --help
#   Usage: npm-proxy-cache [options]
#
#   Options:
# -h, --host [name]       Hostname [localhost]
# -p, --port [number]     An integer argument [8080]
# -t, --ttl [seconds]     Cache lifetime in seconds [1800]
# -s, --storage [path]    Storage path
# -x, --proxy             HTTP proxy to be used, e.g. http://user:pass@example.com:8888/
# -e, --expired           Use expired cache when npm registry unavailable
# -f, --friendly-names    Use actual file names instead of hashes in the cache
# -v, --verbose           Verbose mode
# -n, --metadata-excluded Exclude metadata requests from caching
# -l, --log-path          Log path
# -m, --internal-port     HTTPs port to use for internal proxying "MITM" server (necessary for running on Windows systems)
# --help                  This help
