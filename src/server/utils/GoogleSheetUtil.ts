import axios from 'axios';

export interface GoogleSheet {
    version: string;
    encoding: string;
    feed: Feed;
}

export interface Feed {
    xmlns: string;
    xmlns$openSearch: string;
    xmlns$gsx: string;
    id: Id;
    updated: Id;
    category: Category[];
    title: Title;
    link: Link[];
    author: Author[];
    openSearch$totalResults: Id;
    openSearch$startIndex: Id;
    entry: Entry[];
}

export interface Entry {
    id: Id;
    updated: Id;
    category: Category[];
    title: Title;
    content: Title;
    link: Link[];
    // gsx$key: Id;
    // gsx$en: Id;
    // 'gsx$zh-tw': Id;
    // 'gsx$zh-cn': Id;
}

export interface Author {
    name: Id;
    email: Id;
}

export interface Link {
    rel: string;
    type: string;
    href: string;
}

export interface Title {
    type: string;
    $t: string;
}

export interface Category {
    scheme: string;
    term: string;
}

export interface Id {
    $t: string;
}

class GoogleSheetUtil {
    static async getＳpreadsheet(
        key: string,
        no: number = 1
    ): Promise<GoogleSheet | null> {
        const url = `https://spreadsheets.google.com/feeds/cells/${key}/${no}/public/full?alt=json`;

        return await axios
            .get<GoogleSheet>(url)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return null;
            });
    }
}

export default GoogleSheetUtil;
