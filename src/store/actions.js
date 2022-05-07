export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // payload 新添加的商品
            let oldProduct = null;
            //查找之前数组是否有该商品
            for (let item of context.state.cartList) {
                if (item.iid === payload.iid) {
                    oldProduct = item;
                }
            }
            // 判断oldProduct
            if (oldProduct) {
                context.commit("addCounter", oldProduct);
                resolve("当前数量+1");
            } else {
                payload.count = 1;
                context.commit("addToCart", payload);
                resolve("添加新的商品");
            }
        });
    },
};