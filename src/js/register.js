require(["require.config"], () => {
    require(["jquery", "url", "header", "footer"], ($, url) => {
        function Register() {
            this.init();
            this.flag = [0, 0, 0];
            
        }
        $.extend(Register.prototype, {
            init() {
                this.form();
                this.save();
            },
            form() {
                let _this = this;
                $("#telephone").change(function () {
                    let phone = $(this).val();
                    if (!(/^1[34578]\d{9}$/.test(phone))) {
                        $(".err-text span").html("<i></i>手机号码有误，请重填");
                        _this.flag[0] = 0;
                    } else {
                        $(this).next().prop("style", "display:block");
                        $(".err-text span").html("");
                        _this.flag[0] = 1;
                    }
                })
                $("#email").change(function(){
                    let email = $(this).val();
                    if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email))) {
                        $(".err-text span").html("<i></i>邮箱有误，请重填");
                        _this.flag[1] = 0;
                    } else {
                        $(this).next().prop("style", "display:block");
                        $(".err-text span").html("");
                        _this.flag[1] = 1;
                    }
                })
                $("#password").change(function (){
                    _this.password = $(this).val();
                    if (_this.password.length < 8) {
                        $(this).next().removeProp("class");
                        $(".err-text span").html("<i></i>密码位数太少，请重填");
                    } else if (_this.password.length >= 8 && _this.password.length < 12) {
                        $(this).next().prop("class", "weak");
                        $(".err-text span").html("");
                    } else if (_this.password.length >= 12 && _this.password.length < 17) {
                        $(this).next().addClass("moderate");
                        $(".err-text span").html("");
                    } else if (_this.password.length >= 17 && _this.password.length <= 20) {
                        $(this).next().addClass("strong");
                        $(".err-text span").html("");
                    }
                })
                $("#rePassword").change(function () {
                    let repassword = $(this).val();
                    if (repassword === _this.password && _this.password.length >= 8) {
                        $(this).next().prop("style", "display:block");
                        _this.flag[2] = 1;
                    } else {
                        $(".err-text span").html("<i></i>密码不一致，请重填");
                        _this.flag[2] = 0;
                    }
                })
            },
            save() {
                let _this = this;
                $("#check").change(function () {
                    if(this.checked){
                        $("#goRegister").prop("disabled",false);
                    }else{
                        $("#goRegister").prop("disabled",true);
                    }
                    
                })
                
                $("#goRegister").click((e) => {
                    e = e || event;
                    e.preventDefault();
                    
                    if (_this.flag.reduce((prev, cur) => {
                            prev += cur;
                            return prev;
                        }) === 3){
                            $.post(url.phpBaseUrl+"php/register.php", {telephone : $("#telephone").val(),username : $("#username"),email : $("#email").val(),password : $("#password").val()},
                                function (res) {
                                    if(res.res_code === 1){
                                        alert(res.res_message);
                                        location.href = "/html/login.html";
                                    }else{
                                        alert(res.res_message);
                                    }
                                },
                                "json"
                            );
                    } else {
                        if (_this.flag[0] === 0) {
                            $(".err-text span").html("<i></i>请输入正确手机号");
                        } else if (_this.flag[1] === 0) {
                            $(".err-text span").html("<i></i>请输入正确邮箱");
                        } else if (_this.flag[2] === 0) {
                            $(".err-text span").html("<i></i>密码不一致");
                        }
                    }
                })
            }
        })
        new Register();
    })
})