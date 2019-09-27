var gulp = require('gulp');
var loader = require('gulp-load-plugins')();
var browser = require("browser-sync").create();

//压缩js
gulp.task('js',function(done){
	gulp.src('./src/js/*.js')
	.pipe(loader.babel({
		'presets':['@babel/env']
	}))
	.pipe(loader.concat('bundle.js'))
	.pipe(loader.uglify())
	.pipe(loader.rename('bundle.min.js'))
	.pipe(gulp.dest('./dist/js/'))
	done()
})
//压缩css,sass
//sass:css的预处理,它可以定义变量,嵌套,混写等操作
gulp.task('css',function(done){
	gulp.src('./src/css/*.css')
	.pipe(loader.minifyCss())
	.pipe(gulp.dest('./dist/css/'));

	gulp.src('./src/css/*.scss')
	.pipe(loader.sass())
	// .pipe(loader.minifyCss())
	.pipe(gulp.dest('./dist/css/'))

	done()
})
//压缩html
gulp.task('html',function(done){
	gulp.src('./src/*.html')
	.pipe(loader.minifyHtml())
	.pipe(gulp.dest('./dist/'))
	done()
})
//压缩图片
gulp.task('img',function(done){
	gulp.src('./src/img/**')
	.pipe(loader.imagemin())
	.pipe(gulp.dest('./dist/img/'))
	done()
})
//合并前面的任务,并刷新页面
gulp.task('minify',gulp.series(gulp.parallel('js','html','css'),function(done){
	//刷新页面
	browser.reload()
	done()
}))
//开启web服务器
gulp.task('default',gulp.series(gulp.parallel('js','html','css','img'),function(done){
	browser.init({
		server:'./dist/',
		port:80
	})
	gulp.watch('./src/',gulp.series('minify'))
	done()
}))