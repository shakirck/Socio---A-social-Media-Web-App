const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const ugilify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');



 gulp.task('css',function(done){
    console.log('minifying css....');
    gulp.src('./assets/sass/**/*.css')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true,
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js',function(done){
    console.log('minifying js .....');
    gulp.src('./assets/**/*.js')
    .pipe(ugilify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images',function(done){
    console.log('compressing images.....');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('clean:assets',function(done){
    console.log('cleaning....');
    del.sync('./public/assets');
    done();
})

gulp.task('build',gulp.series('clean:assets','css','images','js'),function(){
    console.log('Building assets');
    done();
})




