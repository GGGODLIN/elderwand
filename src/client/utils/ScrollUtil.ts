export default class ScrollUtil {
    // static disableScroll = () => {
    //     // document.body.style.overflowY = "hidden";
    //     // document.body.style.height = "100vh"
    // };
    // static enableBodyScroll = () => {
    //     // document.body.style.overflowY = "auto";
    //     // document.body.style.height = "auto"
    // };
    static GotoTop = (selector: string = 'main') => {
        setTimeout(() => {
            const main = document.querySelector(selector);
            main.scroll({ top: 0, behavior: 'smooth' });
        }, 100);
    };
}
