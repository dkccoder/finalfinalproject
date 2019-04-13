define(["jquery","template"],($,template)=>{
    class ShopItem{
        constructor(container,url){
            this.container = container;
            this.url = url;
            this.load();
        }
        load(){
            //这里的load是jQuery的ajax请求方法
            this.container.load("/html/module/shopItem.html",()=>{
                this.getData();
            })
        }
        getData(){
            //请求数据列表
            $.get(this.url, res=>{
                this.render(res);
            })
        }
        render(res){
            //用获取的list渲染shop-list并存到新的字符串中
            let html = template("shop-list",{list:res.res_body.data.list});
            this.container.html(html);
        }
    }
    return ShopItem;
})