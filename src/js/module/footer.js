define(["jquery"],$=>{
    class Footer{
        constructor(){
            this.init().then(()=>{
                this.bottom();
            })
        }
        init(){
            //用不到reject可以只写resolve
            return new Promise(resolve => {
                $("#footer-container").load("/html/module/footer.html",()=>{
                    resolve();
                })
            })
        }
        bottom(){
            console.log();
        }
    }
    return new Footer();
})