class StringUtil {
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
     * @summary Example: PascalCase
     */
    static toPascalCase = (text: string) => {
        return text
            .split(/\s/)
            .map((text) => {
                return text.charAt(0).toUpperCase() + text.slice(1);
            })
            .join('');
    };
}

export default StringUtil;
