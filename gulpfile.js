// Include gulp & gulp plugins
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const directoryMap = require("gulp-directory-map");
const fileinclude = require('gulp-file-include');
const flatten = require('gulp-flatten');
const gulp = require('gulp');
const livereload = require('gulp-livereload');
const markdown = require('gulp-markdown');
const minify = require('gulp-minify');
const prettify = require('gulp-html-prettify');
const replace = require('gulp-replace');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');

// Compile SASS
gulp.task('sass', function() {
    return gulp.src('src/css/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('src/'))
});

// Compile and minify js
gulp.task('scripts', function() {
    return gulp.src(
        [
            // angular
            'node_modules/angular/angular.min.js',

            // external plugins
            'node_modules/lunr/lunr.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/flexslider/jquery.flexslider-min.js',
            
            // angular third party modules
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-ui-router-anim-in-out/anim-in-out.js',
            'node_modules/angular-pageslide-directive/dist/angular-pageslide-directive.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-hotkeys/build/hotkeys.min.js',
            'node_modules/angular-tooltips/dist/angular-tooltips.min.js',

            // our application
            'src/app/app.module.js',
            
            // application model
            'src/app/models/app.models.js',

            // application modules
            'src/app/app.routes.js',
            'src/app/app.config.js',
            'src/app/services/stringUtils.js',
            'src/app/directives/app.directives.js',
            'src/app/filters/app.filters.js',
            
                // navigation
                'src/app/modules/nav/nav.module.js',
                'src/app/modules/nav/nav.controller.js',

                // search
                'src/app/modules/search/search.module.js',
                'src/app/modules/search/search.controller.js',

                // background
                'src/app/modules/background/background.js',
        ]
    )
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('src/'));
});

// Build navigation
gulp.task('buildNavigationIndex', function() {
    return gulp.src([
        'documentation/**/*.md',
        '!src/pages/home.html',
        '!src/pages/404.html',
        ])
        .pipe(directoryMap({
            filename: 'docsTree.json'
        }))
        .pipe(gulp.dest('src/app/models/'));
});

// Turn markdown files into HTML
gulp.task('markdown', function() {
    return gulp.src('documentation/**/*.md')
        .pipe(replace('img src="', 'img src="src/pages/assets/'))
        .pipe(markdown())
        .pipe(prettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('src/pages'));
});

// Move doc assets e.g. images to HTML section
gulp.task('doc-assets', function() {
    return gulp.src(['documentation/**/*.png', 'documentation/**/*.jpg'])
        .pipe(flatten())
        .pipe(gulp.dest('src/pages/assets/'))
})

// doc master function
gulp.task('docs', function() {
    runSequence('markdown', 'doc-assets');
})

// build our search index
gulp.task('buildindex', function() {
    return gulp.src([
            'src/pages/**/*.html',
            '!src/pages/home.html',
            '!src/pages/404.html',
        ])
        .pipe(concat('searchindex.html'))
        .pipe(gulp.dest('src/app/modules/search/'));
});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('refresh', function() {
    return gulp.src([
        'index.html'
    ])
    .pipe(connect.reload());
})

// Watch for changes
gulp.task('watch', function() {

    // Watch .html files
    gulp.watch('src/**/*.html', function(callback) {
        runSequence(
            'buildindex', 
            'refresh'
        );
    });

    // Watch .js files
    gulp.watch('src/**/*.js', function(callback) {
        runSequence(
           'scripts', 
           'refresh'
        );
    });

    // Watch .scss files
    gulp.watch('src/**/*.scss', function(callback) {
        runSequence(
            'sass',
            'refresh'
        )
    });

    // Watch .md files
    gulp.watch('documentation/**/*.md', function(callback) {
        runSequence(
            'docs', 
            'buildNavigationIndex',
            'refresh'
        );
    });
});

gulp.task('default', function(callback) {
    runSequence(
        'scripts',
        'sass',
        'docs',
        'buildindex',
        'buildNavigationIndex',
        'watch',
        'connect',
        'refresh'
    )
});