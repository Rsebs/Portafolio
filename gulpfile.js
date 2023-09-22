const {src, dest, watch, series} = require('gulp');

// CSS and SASS
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css() {
    return src('src/scss/app.scss')
        .pipe(sourcemaps.init()) // Map CSS
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()])) // Mificación de CSS
        .pipe(sourcemaps.write('.')) // Map CSS
        .pipe(dest('build/css'))
        ;
}

function images() {
    return src('src/img/**/*')
        .pipe(imagemin({optimizationLevel : 3})) //Minificación de imágenes
        .pipe(dest('build/img'))
}

function webpVersion() {
    const option = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(option))
        .pipe(dest('build/img'))
}

function avifVersion() {
    const option = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(option))
        .pipe(dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', images);
}

exports.css = css;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.dev = dev;

exports.default = series(images, webpVersion, avifVersion, css, dev);