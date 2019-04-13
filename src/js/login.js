require(["require.config"],()=>{
    require(["jquery","url","cookie","header","footer"],($,url,cookie)=>{
        
        function Login() {
            this.init();
        }
        $.extend(Login.prototype, {
            init() {
                this.form();
                this.post();
            },
            form() {
                let _this = this;
                
                $("#loginName").change(function () {
                    _this.loginName = $(this).val();
                })
                $("#password").change(function (){
                    _this.password = $(this).val();
                })
                
            },
            post() {
                let _this = this;
                let telephone,email;
                $(".login-button").click((e) => {
                    e = e || event;
                    e.preventDefault();
                    if($("#loginName").val()==""){
                        $(".err-text span").html("<i></i>请输入手机号或邮箱");
                    }else if($("#password").val()==""){
                        $(".err-text span").html("<i></i>请输入密码");
                    }else{
                        $(".err-text span").html("");
                        parseInt(_this.loginName)===Number(_this.loginName)?telephone = _this.loginName:email = _this.loginName;
                        $.post(url.phpBaseUrl+"php/login.php", {telephone : telephone,email : email,password : $("#password").val()},
                                function (res) {
                                    telephone = undefined,email = undefined;
                                    if(res.res_code === 1){
                                        $.cookie("username",res.res_body.data[0].username,{expires:3,path:'/'});
                                        alert(res.res_message+"即将跳转首页");
                                        location.href = "/index.html";
                                    }else{
                                        alert(res.res_message);
                                    }
                                },
                                "json"
                            );
                    }
                })
            }
        })
        new Login();

    })
})