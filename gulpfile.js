const gulp = require("gulp"),
  htmlmin = require("gulp-htmlmin"),
  minifyCss = require("gulp-minify-css"),
  sass = require("gulp-sass"),
  //压缩js
  uglify = require("gulp-uglify"),
  //ES6转ES5
  babel = require("gulp-babel"),
  connect = require("gulp-connect");

//   gulp.task('default', () => {
//     console.log("default");
//   });

  gulp.task("html", () => {
    gulp.src("src/**/*.html")
      .pipe(htmlmin({
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS 
      }))
      .pipe(gulp.dest("dist"))
      .pipe(connect.reload());
  })

  gulp.task("css", () => {
    gulp.src("src/css/*.scss")
      .pipe(sass())
      .pipe(minifyCss())
      .pipe(gulp.dest("dist/css"))
      .pipe(connect.reload());
  })
  
  gulp.task("js", () => {  
    //**所有目录
    //*所有文件
    gulp.src("src/js/**/*.js")
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest("dist/js"))
      .pipe(connect.reload());
  })
  
  gulp.task("lib" ,() => {
    gulp.src("src/lib/**/*")
      .pipe(gulp.dest("dist/lib"))
      .pipe(connect.reload());
  })

  gulp.task("img", () => {
    gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))
    .pipe(connect.reload());
})

gulp.task('watch',function(){
    gulp.watch('src/css/*.scss',['css']);
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/img/**/*',['img']);
})

gulp.task("server", () => {
    connect.server({
      port: 1901,
      //自动重启功能
      livereload : true,
      //运行的根目录
      root: "dist"
    })
})

gulp.task("default",["html","css","js","lib","img","server","watch"]);

  
  