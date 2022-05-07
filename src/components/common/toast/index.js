import Toast from "./Toast";
const obj = {};

obj.install = function(Vue) {
    // install方法调用时，会将 Vue 作为参数传入。
    // 1、创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    // 2、通过new的方式，根据组件构造器创建出一个组件对象
    const toast = new toastContrustor();
    // 3、将组件对象手动$mount挂载在一个元素上
    toast.$mount(document.createElement("div"));
    // 4、这个时候$el对应是手动创建的div元素,将这个$el添加到body里面去
    document.body.appendChild(toast.$el);
    Vue.prototype.$toast = toast;
};
export default obj;