class StringUtil {
    /**
     * @param  {string} text
     * @summary Example: origin text string to OriginTextString
     */
    static toUpperCaseFirstLetter = (text: string) => {
        return text
            .split(/\s/)
            .map((text) => {
                return text.charAt(0).toUpperCase() + text.slice(1);
            })
            .join('');
    };

    /**
     * @param  {string} text
     * @summary Example: Origin Text String to PascalCase
     */
    static toPascalCase = (text: string) => {
        return text
            .split(/\s/)
            .map((text) => {
                return text.charAt(0).toUpperCase() + text.slice(1);
            })
            .join('');
    };

    /**
     * @param  {string} text
     * @summary Example: Origin Text String to  kebab-case-example
     */
    static toKebabCase = (text: string) => {
        return text
            .split(/\s/)
            .map((text) => {
                return text.replace(
                    /[A-Z]/g,
                    (letter) => `${letter.toLowerCase()}`
                );
            })
            .join('-');
    };

    /**
     * @param  {string} target
     * @param  {RegExp} pattern
     * @param  {string} splitter
     * @summary Example: Origin Text String to  kebab-case-example
     */
    static split(
        target: string,
        pattern: RegExp,
        splitter: string = ''
    ): string {
        return target
            .replace(pattern, (letter) => `${splitter}${letter}`)
            .replace(splitter, '');
    }
}

const test = {};

export default StringUtil;
