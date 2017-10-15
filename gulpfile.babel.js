/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Lint JavaScript
// 使わない。Lintはエディタ側で行う
gulp.task('lint', () =>
    gulp.src([
      'app/scripts/**/*.js',
      '!app/scripts/vendor/**/*.js',
      '!app/scripts/_core/**/*.js',
    ])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failOnError()))
);

// Optimize images
gulp.task('images', () =>
    gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
          progressive: true,
          interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size({title: 'images'}))
);

// Copy all files at the root level (app)
gulp.task('copy', () =>
    gulp.src([
      'app/*',
      'app/**/*',
      '!app/*.html',
      '!app/free-space/**/*',
      'node_modules/apache-server-configs/dist/.htaccess'
    ], {
      dot: true
    }).pipe(gulp.dest('dist'))
        .pipe($.size({title: 'copy'}))
);

// free-spaceディレクトリ以下に関しては全てのデータを移動
gulp.task('free-space-copy', () =>
    gulp.src([
      'app/free-space/**/*'
    ], {
      dot: true
    }).pipe(gulp.dest('dist/free-space/'))
        .pipe($.size({title: 'free-space-copy'}))
);

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    // 'ie >= 11',
    // 'ff >= 30',
    // 'chrome >= 34',
    // 'safari >= 7',
    // 'ios >= 7',
    // 'android >= 4.4'
      "ie >= 11",
      "last 2 Edge versions",
      "last 2 Firefox versions",
      "last 2 Chrome versions",
      "last 2 Safari versions",
      "last 2 Opera versions",
      "last 2 iOS versions",
      "last 2 ChromeAndroid versions"
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/styles/**/*.scss',
    'app/styles/**/*.css'
  ])
      .pipe($.newer('.tmp/styles'))
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        precision: 10
      }).on('error', $.sass.logError))
      .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(gulp.dest('.tmp/styles'))
      // Concatenate and minify styles
      .pipe($.if('*.css', $.cssnano()))
      .pipe($.size({title: 'styles'}))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('dist/styles'))
      .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('ts', () => {
  return gulp.src('app/scripts/**/*.ts')
    .pipe($.typescript({
      target: 'ES5',
      removeComments: true
    }))
    .pipe(gulp.dest('app/scripts'));
});

gulp.task('scripts', () =>
    gulp.src([
      'app/scripts/**/*.js'
    ])
    //    .pipe($.newer('.tmp/scripts'))
    //    .pipe($.sourcemaps.init())
    //    .pipe($.babel())
    //    .pipe($.sourcemaps.write())
    //    .pipe(gulp.dest('.tmp/scripts'))
    //.pipe($.concat('main.min.js'))
    //    .pipe($.uglify({preserveComments: 'some'}))
    // Output files
    //    .pipe($.size({title: 'scripts'}))
    //    .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/scripts'))
);

gulp.task("scripts-common", function () {
  // var files = [
  //   'app/scripts/vendor/tweenmax/1.19.0/minified/TweenMax.min.js',
  //   'app/scripts/vendor/stats.min.js',
  //   'app/scripts/vendor/dat.GUI/2.0/dat.gui.min.js',
  //   'app/scripts/vendor/cookie.js',
  //   'app/scripts/common/ga.js',
  //   'app/scripts/common/index.js'
  // ];
  // gulp.src(files)
  //     .pipe($.plumber())
  //     .pipe($.concat('common-index.js'))
  //     .pipe($.uglify({preserveComments: 'some'}))
  //     .pipe(gulp.dest('app/scripts'))
  //     .pipe(gulp.dest('dist/scripts'));
});

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  return gulp.src([
    'app/**/*.html',
    '!app/free-space/**/*.html',
  ])
      .pipe($.useref({
        searchPath: '{.tmp,app}',
        noAssets: true
      }))

      // Minify any HTML
      .pipe($.if('*.html', $.htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true
      })))
      // Output files
      .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
      .pipe(gulp.dest('dist'));
});

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));


// Watch files for changes & reload
gulp.task('serve', ['ts', 'scripts', 'styles', 'sprite'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app'],
    port: 3000
  });

  gulp.watch(['app/**/*.ejs'], ['ejs']);
  gulp.watch(['app/**/*.html', '!app/free-space/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  //gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['app/scripts/**/*.ts'], ['ts', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['scripts', reload]);
  gulp.watch(['app/images/**/*'], reload);

  // free-spaceディレクトリ内のデータ
  gulp.watch(['app/free-space/**/*'], reload);

});


// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () =>
    browserSync({
      notify: false,
      logPrefix: 'WSK',
      // Allow scroll syncing across breakpoints
      scrollElementMapping: ['main', '.mdl-layout'],
      // Run as an https by uncommenting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      // https: true,
      server: 'dist',
      port: 3001
    })
);

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
    runSequence(
        'styles',
        'ts',
        ['html', 'scripts', 'images', 'copy', 'free-space-copy'],
        //['lint', 'html', 'scripts', 'images', 'copy'],
        'generate-service-worker',
        cb
    )
);

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
    // Update the below URL to the public URL of your site
    pagespeed('example.com', {
      strategy: 'mobile'
      // By default we use the PageSpeed Insights free (no API key) tier.
      // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
      // key: 'YOUR_API_KEY'
    }, cb)
);

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
      .pipe(gulp.dest('dist/scripts/sw'));
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: rootDir + '/'
  });
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }


/**
 * EJS
 * フォルダ階層を保持したままdistディレクトリ内にコピーする
 **/
gulp.task("ejs", function () {
  // フォルダ階層を保持
  gulp.src([
    'app/**/*.ejs',
    '!app/**/_*.ejs'
  ])
      .pipe($.plumber())
      .pipe($.ejs())
      .pipe($.rename({extname: '.html'}))
      .pipe(gulp.dest('app'));
});

/**
 * Function - getFolders
 * 指定したフォルダ内に格納されているフォルダ名を取得。さらにその中の階層のフォルダ名は取得できない。
 * icon,spriteで使用
 **/
var getFolders = function (dir) {
  return fs.readdirSync(dir)
      .filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
};

/**
 * sprite
 **/
var spriteLength = 0;
gulp.task('sprite', function () {
  console.log('sprite生成開始');
  var folderArray = getFolders('app/images/sprites');
  folderArray.forEach(function (folderName) {

    // 画像指定時「folderName + '-' + sprite.name」バージョン
    // var spriteData = gulp.src('app/images/sprites/' + folderName + '/*.png')
    //     .pipe($.spritesmith({
    //       imgName: folderName + '.png', // 生成するスプライトの画像ファイル名
    //       cssName: '_' + folderName + '.scss', // 生成するスプライトのsassファイル名
    //       imgPath: '/images/sprites/' + folderName + '.png', // sassに記述されるspriteのパス
    //       cssFormat: 'scss',
    //       cssVarMap: function (sprite) {
    //         sprite.name = folderName + '-' + sprite.name;
    //       }
    //     }));

    // 画像指定時、「sprite.name」バージョン
    var spriteData = gulp.src('app/images/sprites/' + folderName + '/*.png')
      .pipe($.spritesmith({
        imgName: folderName + '.png', // 生成するスプライトの画像ファイル名
        cssName: '_' + folderName + '.scss', // 生成するスプライトのsassファイル名
        imgPath: '/images/sprites/' + folderName + '.png', // sassに記述されるspriteのパス
        cssFormat: 'scss',
        cssVarMap: function (sprite) {
          sprite.name = folderName + '-' + sprite.name;
        }
      }));

    spriteData.img.pipe(gulp.dest('app/images/sprites'));
    spriteData.css.pipe(gulp.dest('app/styles/sprites'));

    spriteLength++
    console.log('sprite' + spriteLength + '->' + folderName);
  });
});

/**
 * icon
 **/
var iconLength = 0;
gulp.task('icon', function () {
  console.log('icon生成開始');
  var folderArray = getFolders('app/images/icons');
  folderArray.forEach(function (folderName) {
    console.log(folderName);
    gulp.src('app/images/icons/' + folderName + '/*.svg')
        .pipe($.iconfont({
          fontName: folderName,
          formats: ['svg', 'ttf', 'eot', 'woff', 'woff2']
        }))
        .on('glyphs', function (glyphs, options) {
          var opt = {
            glyphs: glyphs.map(function (glyph) {
              return {
                name: glyph.name,
                codepoint: glyph.unicode[0].charCodeAt(0)
              };
            }),
            fontName: folderName,
            fontPath: '/images/icons/',
            className: 's'
          };

          // scss生成
          gulp.src('app/template/icon.scss')
              .pipe($.consolidate('lodash', opt))
              .pipe($.rename({basename: '_' + folderName}))
              .pipe(gulp.dest('app/styles/icons'))

          // サンプルページ生成
          gulp.src('app/template/icon.html')
              .pipe($.consolidate('lodash', opt))
              .pipe($.rename({basename: 'icon-' + folderName}))
              .pipe(gulp.dest('app/developers'))
        })

        // アイコンフォント生成
        .pipe(gulp.dest('app/images/icons'))

    iconLength++
    console.log('icon' + iconLength + '->' + folderName);
  });
});


/**
 * ビルド
 * 使ってない
 **/
gulp.task('sprite-c', function (callback) {
  runSequence(
      'sprite',
      'ejs',
      'html',
      'ts',
      'scripts-common',
      'scripts',
      'icon',
      'styles',
      callback
  );
});