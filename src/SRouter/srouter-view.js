export default {
    render(h) {
      console.log('render');
    //    标记当前的router-view深度
        console.log('router-view', this.$router);
        this.$vnode.data.routerView = true;
        let depth = 0;
        let parent = this.$parent;
        while (parent) {
            const vnodeData = parent.$vnode && parent.$vnode.data
            if(vnodeData) {
                if(vnodeData.routerView) {
                    // 说明当前的parent router-view
                    depth++;
                }
            }
            parent = parent.$parent
        }
    //    路由匹配时获取代表深度层级的matched数组
        let component = null;
        const route = this.$router.matched[depth]
        if(route) {
            component = route.component
        }
        console.log(h(component))
        return  h(component)
    }
}