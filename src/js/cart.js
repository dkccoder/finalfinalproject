require(["require.config"],function(){
    require(["jquery","template","header","footer"],($,template)=>{
        function Cart(){
            this.init();
        }
        $.extend(Cart.prototype,{
            init(){
                this.price;
                this.display();
                this.render();
            },
            //渲染
            render(){
                var html = template("goods-list",{cart : this.cart});
                $("#goods-table").html(html);
                this.birth();
                this.disable();
                this.operate();
                this.sumPrice();
                this.delete();
            },
            //选择生日卡片
            birth(){
                $(".action-birthday_card").on("click",function(){
                    let _this = $(this);
                    $(this).next().attr("style","display:block");
                    $(".birthday-card-option").on("click",function(){
                        _this.text($(this).text());
                        $(this).parent().attr("style","display:none");
                    })
                })
            },
            //操作购买数量
            operate(){
                //这里的_this记录生成的所有Cart类，也为了运行全局函数
                let _this = this,
                    __this,
                    num = $("._quantity").val();
                $(".plus").click(function(){
                    let nums = $(this).prev().prop("value");
                    $(this).prev().prop("value",++nums);
                    num = $("._quantity").val();
                    _this.disable();
                    _this.localS(this);
                    _this.sumPrice(this);
                    let amount = Number($(".header-cart span").text());
                    _this.shopcart(++amount);
                })
                $(".minus").click(function(){
                    __this = this;
                    let nums = $(this).next().prop("value");
                    $(this).next().prop("value",--nums);
                    num = $("._quantity").val();
                    _this.disable();
                    _this.localS(this);
                    _this.sumPrice(this);
                    let amount = Number($(".header-cart span").text());
                    _this.shopcart(--amount);
                })
                $("._quantity").blur(function(){
                    __this = this;
                    let change;
                    if($(this).val()>99 || $(this).val()<1){
                        alert("数量为1~99");
                        $(this).prop("value",num);
                    }else{
                        change = Number($("._quantity").val())-Number(num);
                        num = $("._quantity").val();
                    }
                    _this.disable();
                    _this.localS(this);
                    _this.sumPrice(this);
                    let amount = Number($(".header-cart span").text());
                    _this.shopcart(amount+change);
                })
            },
            localS(_this){
                let i;
                if(this.cart.some((item,index)=>{
                    i = index;
                    return $(_this).parent().parent().parent().attr("goods-id") === item.id;
                })){
                    this.cart[i].num = $("._quantity").val();
                    localStorage.setItem("cart",JSON.stringify(this.cart));
                }
            },
            //商品数量范围1~99，否则禁用加减按钮
            disable(){
                $("._quantity").each(function(){
                    if($(this).prop("value") <= 1){
                        $(this).prev(".minus").prop("disabled",true);
                    }else if($(this).prop("value") >= 99){
                        $(this).next(".plus").prop("disabled",true);
                    }else{
                        $(this).prev().prop("disabled",false);
                        $(this).next().prop("disabled",false);
                    }
                })
            },
            //计算总价
            sumPrice(that){
                let eachFather = $(that).parent().parent().parent();
                eachFather.find("#totalPrice").text(eachFather.find("._quantity").val()*eachFather.find("#price").text());
                this.price = 0;
                let _this = this;
                $(".scene_area").each(function(){
                    _this.price += Number($(this).find("#totalPrice").text());
                })
                $("#allPrice").text(this.price);
                $("#allprice").text(this.price+".00");
            },
            //购物车数量
            shopcart(amount){
                $(".header-cart span").text(amount);
            },
            //删除商品
            delete(){
                let _this = this;
                //删除单个商品数据
                $(".delete a").click(function(){
                    if(confirm("你确定要删除吗？")){
                        let i;
                        if(_this.cart.some((item,index)=>{
                            i = index;
                            return $(this).parent().parent().attr("goods-id") === item.id;
                        })){
                            _this.shopcart(Number($(".header-cart span").text())-Number($(this).parent().prev().prev().val()));
                            _this.cart.splice(i,1);
                            $(this).parent().parent().remove();
                        }
                        localStorage.setItem("cart",JSON.stringify(_this.cart));
                        if(_this.cart.length === 0){
                            localStorage.removeItem("cart");
                            $(".header-cart span").remove();
                        }
                        let goodsTotal = $(".header-cart span").text();
                        $(".header-cart span").text(--goodsTotal);
                        _this.sumPrice();
                        _this.display();
                    }
                })
                //清空购物车
                $(".cart-submit-empty").click(()=>{
                    if(confirm("你确定要删除吗？")){
                        $(".scene_area").each(function(){
                            $(this).remove();
                        })
                        $(".header-cart span").remove();
                        localStorage.removeItem("cart");
                        _this.sumPrice();
                        _this.display();
                    }
                })
            },
            //根据localStorage里是否有数据来向页面展示
            display(){
                this.cart = JSON.parse(localStorage.getItem("cart"));
                if(this.cart == null){
                    $(".cart-not-pro").prop("style","display:block");
                    $(".cart-area").prop("style","display:none");
                }
            }
        })
        new Cart();
    })
})