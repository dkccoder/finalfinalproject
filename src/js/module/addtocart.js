define(["jquery","fly"],($,fly)=>{
    //用事件绑定
    //container为父级元素,btnAdd为添加购物车按钮，detail为要添加的那条数据
    return function (container, btnAdd,detail,islist){
            container.on("click",btnAdd,function(e){
                if(islist){
                    //detail没有传递，从dom上获取商品信息
                    let message = $(this).prev().prev();
                    let price = $(message).find("b").text(),
                        title = $(message).find("h3").text(),
                        img = $(message).find("img").attr("src"),
                        id = $(this).attr("data-id");
                    detail = {price,title,img,id};
                }
                let goodsTotal = 0;
                if($(".header-cart span").text().length !== 0){
                    goodsTotal = Number($(".header-cart span").text());
                }else{
                    $(".header-cart i").after("<span></span>");
                }
                $(".header-cart span").text(++goodsTotal);
                let cart = localStorage.getItem("cart");
                if(cart){
                    cart = JSON.parse(cart);
                    let i;
                    if(cart.some((item,index)=>{
                        i = index;
                        return detail.id === item.id;
                    })){
                        cart[i].num++;
                    }else{
                        cart.push({...detail,num:1});
                    }
                }else{
                    cart = [{...detail,num:1}];
                }
                localStorage.setItem("cart",JSON.stringify(cart));

                //抛物线加入购物车
            $(`<div style="width:40px;height:40px;"><img style="width:30px;height:30px;" src="/img/hotdog.png"/></div>`).fly({
                start:{
                    left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
                    top: e.clientY,  //开始位置（必填）
                  },
                  end:{
                    left: $(window).innerWidth() - 44, //结束位置（必填）
                    top: $("#cart-count-icon").position().top ,  //结束位置（必填）
                    width: 30, //结束时高度
                    height: 30, //结束时高度
                  },
                  autoPlay: true, //是否直接运动,默认true
                  speed: 1, //越大越快，默认1.2
                  vertex_Rtop: 15, //运动轨迹最高点top值，默认20
                  onEnd: function(){
                      this.destroy() //把运动的小方块销毁
                  } //结束回调
            })
            })

            
    }
})