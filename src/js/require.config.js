require.config({
    //路径直接在apache下
    baseUrl:"/",
    paths : {
        //依赖模块
        "jquery" : "lib/jquery/jquery-3.2.1",
        "header" : "js/module/header",
        "footer" : "js/module/footer",
        "url" : "js/module/url",
        "template" : "lib/art-template/template-web",
        "shopItem" : "js/module/shopItem",
        "zoom" : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "cookie" : "lib/jquery-plugins/jquery.cookie",
        "addtocart" : "js/module/addtocart",
        "fly"       : "lib/jquery-plugins/jquery.fly.min"
    },
    // 垫片，不满足AMD规范的模块，但是又依赖于另外的模块
	// zoom就不满足AMD规范，但又依赖于jquery
    shim : {
        "zoom" : {
            deps : ["jquery"]
        },
        "fly" : {
            deps : ["jquery"]
        }
    }
})