// define(["jquery"],function($){//define也可以指定依赖文件
//     class Header{
//         constructor(){
//             this.init();
//         }
//         init(){
//             //load方法把元素加载到前置元素中，相当于ajax，异步执行，
//             //第一个参数为加载文件的路径(完整路径后可以空格加选择器来选择文件中的部分代码，即"/html/module/header.html .header")
//             //第二个参数为回调函数，指的是load加载结束以后执行的代码，回调中才代表异步完成
//             $("#header-container").load("/html/module/header.html",function(){
//                 console.log(111);
//             });

            
            

//         }
//     }
//     return new Header();
// })

//promise可以把异步改成同步，即promise完成接收到resolve之后才在then中执行后面的代码
define(["jquery","cookie"],function($,cookie){
    class Header{
        constructor(){
            //调完this.init后得到一个promise，.then里面的东西就是resolve
            this.init().then(()=>{
                this.login();
                this.goodsNum();
                this.loginout();
            })
        }
        init(){
            return new Promise((resolve,reject) => {
                $("#header-container").load("/html/module/header.html",()=>{
                    resolve();
                });
            })
        }
        islogin(){
            
        }
        login(){
            if($.cookie('username') != undefined){
                $(".not-login").prop("style","display:none");
                $(".header-user").prop("style","display:inline-block");
                $(".userName").text($.cookie('username'));
            }else{
                $(".header-cart").click((e)=>{
                    e.preventDefault();
                    alert("请先登录");
                    location.href = "/html/login.html";
                })
            }
        }
        loginout(){
            $(".loginout").click(()=>{
                if(confirm("确定要退出吗？")){
                    $.cookie('username','',{expires:-1,path:'/'});
                    this.init();
                    location.href = "/";
                }
            })
        }
        goodsNum(){
            let cart = JSON.parse(localStorage.getItem("cart")),sum=0;
            if(cart){
                cart.forEach(function(goods){
                    sum += Number(goods.num);
                })
                if(sum){
                    $(".header-cart i").after("<span></span>");
                    $(".header-cart span").text(sum);
                }
            }
        }
    }
    return new Header;
})