require(['require.config'],()=>{
    require(['jquery','url','template','addtocart','header','footer','zoom'],($,url,template,addtocart)=>{
        class Detail{
            constructor(){
                this.init();
                this.zoom();
            }
            init(){
                let id = location.search.slice(4);
                $.ajax({
                    url : url.baseUrl + "detail?id="+id,
                    method : "GET",
                    dataType : "json",
                    success : res =>{
                        if(res.res_code === 1){
                            //在本页中保存获取到的商品数据
                            this.detail = res.res_body.data.detail;
                            this.detail.id = id;
                            this.render(res.res_body.data);
                        }
                    }
                })
                
            }
            render(data){
                $(".pro-details-cont").html(template("detail-template",{...data.detail}));
                // $(".details-banner").html(template("banner-template",data.detail));
                this.addcart();
            }
            zoom () {
                // 放大镜插件
                $(".zoom-img").elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'
                });
              }
            // bindEvents(){
            //     $(".details-Specifications-size ul").on('click',function(e){
            //         e = e || event;
            //         let target = e.srcElement || e.target;
            //         console.log($(this).children().className);
            //         target.className = "active";
            //     })
            // }
            // banner(){
            //     // console.log($(".bannerImgList").children("li").eq(1).html());
            //     //each用来遍历
            //     $(".bannerImgList").children("li").each(function(){
            //         $(this).on("mouseenter",()=>{
            //             $(".bannerImgList").children("li.active").removeClass("active");
            //             $(this).addClass("active");
            //             $(".left-img-box").html($(this).html());
            //         })
            //     })
            // }
            addcart(){
                addtocart($(".details-button"),$(".details-but-cart"),this.detail);
            }
        }
        new Detail();
    })
})