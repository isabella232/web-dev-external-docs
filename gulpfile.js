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
    return gulp.src('dist/css/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/'))
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
            'node_modules/angular-scroll/angular-scroll.min.js',

            // our application
            'dist/app/app.module.js',

            // application model
            'dist/app/models/app.models.js',

            // application modules
            'dist/app/app.routes.js',
            'dist/app/services/stringUtils.js',
            'dist/app/app.config.js',
            'dist/app/directives/app.directives.js',
            'dist/app/filters/app.filters.js',

                // navigation
                'dist/app/modules/nav/nav.module.js',
                'dist/app/modules/nav/nav.controller.js',

                // search
                'dist/app/modules/search/search.module.js',
                'dist/app/modules/search/search.controller.js',

                // page viewer
                'dist/app/modules/page-viewer/page-viewer.module.js',
                'dist/app/modules/page-viewer/page-viewer.model.js',
                'dist/app/modules/page-viewer/page-viewer.controller.js',

                // background
                'dist/app/modules/background/background.module.js',
                'dist/app/modules/background/background.controller.js',
        ]
    )
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/'));
});

// Build navigation
gulp.task('buildNavigationIndex', function() {
    return gulp.src(
            [
                'src/**/*.md',
                '!dist/pages/home.html',
                '!dist/pages/404.html',
                '!src/_drafts/**/*'
            ]
        )
        .pipe(directoryMap({filename: 'docsTree.json'}))
        .pipe(gulp.dest('dist/app/models/'));
});

// Turn markdown files into HTML
gulp.task(
    'markdown',
    function() {
        return gulp.src(
            [
                'src/**/*.md',
                '!/src/_drafts/**/*'
            ])
            .pipe(replace('img src="', 'img src="dist/pages/assets/'))
            .pipe(markdown())
            .pipe(prettify({indent_char: ' ', indent_size: 4}))
            .pipe(gulp.dest('dist/pages'));
    }
);

// Move doc assets e.g. images to HTML section
gulp.task(
    'doc-assets',
    function() {
        return gulp.src(
            [
                'src/**/*.png',
                'src/**/*.jpg',
                'src/**/*.svg',
                '!src/_drafts/**/*',
            ])
        .pipe(flatten())
        .pipe(gulp.dest('dist/pages/assets/'))
    }
);

// doc master function
gulp.task(
    'docs',
    function() {
        runSequence('markdown', 'doc-assets');
    }
)

// build our search index
gulp.task(
    'buildindex',
    function() {
        return gulp.src(
            [
                'dist/pages/**/*.html',
                '!dist/pages/home.html',
                '!dist/pages/404.html',
            ]
        )
        .pipe(concat('searchindex.html'))
        .pipe(gulp.dest('dist/app/modules/search/'));
});

gulp.task(
    'connect',
    function() {
        connect.server(
            {
                livereload: true
            }
        );
    }
);

gulp.task(
    'refresh',
    function() {
        return gulp.src(
            [
                'index.html'
            ]
        )
    .pipe(connect.reload());
});

// Watch for changes
gulp.task(
    'watch',
    function() {

        // Watch .html files
        gulp.watch(
            'dist/**/*.html',
            function(callback) {
                runSequence(
                    'buildindex',
                    'refresh'
                );
            }
        );

        // Watch .js files
        gulp.watch(
            'dist/**/*.js',
            function(callback) {
                runSequence(
                   'scripts',
                   'refresh'
                );
            }
        );

        // Watch .scss files
        gulp.watch(
            'dist/**/*.scss',
            function(callback) {
                runSequence(
                    'sass',
                    'refresh'
                )
            }
        );

        // Watch .md files
        gulp.watch(
            'src/**/*.md',
            function(callback) {
                runSequence(
                    'docs',
                    'buildNavigationIndex',
                    'refresh'
                );
            }
        );
});

gulp.task(
    'default',
    function(callback) {
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
    }
);