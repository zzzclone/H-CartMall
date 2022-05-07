import { request } from "./request";
// 这里文件import中加{}和不加{}的区别 取决于import来源的js文件。如果来源js中export指定了组件的mc，那么加{}，如果js是默认输出则不需要
export function getHomeMultidata() {
    return request({
        url: "/home/multidata",
    });
}
export function getHomeGoods(type, page) {
    return request({
        url: "/home/data",
        params: {
            // params展示请求到的数据
            type,
            page,
        },
    });
}