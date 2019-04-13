require(["require.config"],function(){
    require(["jquery","url","template","shopItem","addtocart","header","footer"],function($,url,template,ShopItem,addtocart){
        class Detail{
            constructor(){
                this.init();
            }
            init(){
                new ShopItem($("#catyListContainer"),url.baseUrl + "/list/get");
                addtocart($("#catyListContainer"),".pro-list-addcart",null,true);
                this.liststyle();
            }
            liststyle(){
                $(".cat-list dd").eq(location.search.slice(6)).prop("class","active");
            }
        }
       
        new Detail();
    })
})