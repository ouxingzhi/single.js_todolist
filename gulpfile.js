
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-html-minifier');
var r = require('gulp-seajs-r');
var replace = require('gulp-replace');
var manifest = require('gulp-appcache');


var src = './src';

var build = './build2';

var ignore = [
		'!' + src + '/views/friend/list.js',
		'!' + src + '/views/friend/guide.js',
		'!' + src + '/views/listener/home.js',
		'!' + src + '/templates/friend/list.html',
		'!' + src + '/templates/friend/guide.html',
		'!' + src + '/templates/listener/home.html'
	];

gulp.task('build.min.js',['clean'],function(){
	return gulp.src([src + '/**/*.js'],{base:'./src'})
		.pipe(r({
			formatPath:function(path){
				return 'webapp/'+path;
			}
		}))
		.pipe(uglify({
            mangle: {except: ['require','$super']}
        }))
        .pipe(gulp.dest(build));
});

gulp.task('build.min.html',['clean'],function(){
	return gulp.src([src + '/**/*.html'].concat(ignore))
		.pipe(minifyhtml({collapseWhitespace: true}))
		.pipe(gulp.dest(build));
});

gulp.task('copy.images',['clean'],function(){
	return gulp.src([src + '/**/*.jpg',src + '/**/*.png',,src + '/**/*.gif'])
		.pipe(gulp.dest(build));
});

gulp.task('minify.css',['clean'],function(){
	return gulp.src(src + '/**/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest(build));
});

gulp.task('addtime',['clean'],function(){
	return gulp.src('./*.html')
		.pipe(replace(/\.js"/img, '.js?t='+(+new Date())+'"'))
		.pipe(replace(/\.css"/img, '.css?t='+(+new Date())+'"'))
		.pipe(replace(/\.js[^"\/]+"/mg,'.js?t='+(+new Date())+'"'))
		.pipe(replace(/\.css[^"\/]+"/mg, '.css?t='+(+new Date())+'"'))
		.pipe(gulp.dest('./'));
});

gulp.task('build.pack.js',['clean'],function(){
	return gulp.src([src + '/**/*.html',src + '/**/*.js'].concat(ignore),{base:'./src'})
		.pipe(r({
			formatPath:function(path){
				return 'webapp/'+path;
			}
		}))
		.pipe(uglify({
            mangle: {except: ['require','$super']}
        }))
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(build));
});

gulp.task('clean',function(){
	return gulp.src(build,{read:false})
		.pipe(clean());
});


gulp.task('manifest',['build.min.js','build.pack.js','build.min.html','minify.css'],function(){
  gulp.src(['./**/*.js','./**/*.css','./**/*.png','./**/*.jpg','./**/*.gif','!./node_modules/**','!./*.js'])
    .pipe(manifest({
		hash: true,
		network: ['http://*', 'https://*', '*'],
		filename: 'app.manifest',
		exclude: 'app.manifest'
	}))
    .pipe(gulp.dest('./'));
});

gulp.task('default',['build.min.js','build.pack.js','build.min.html','minify.css','copy.images','addtime','manifest']);