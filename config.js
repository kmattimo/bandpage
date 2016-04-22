var path = require('path');
// source directories
var srcDir = 'src';
var srcAssetsDir = srcDir + '/public';

// destination directories
var destDir = 'site';
var destAssetsDir = destDir + '/public';

// modules
var imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {

  dev: true, // gutil.env.dev

  logging: {
    logErrors: true,
    writeToFile: false,
    verbose: true
  },

  src: {
    docs: srcDir + '/docs/**/*.{md,markdown}',
    pages: srcDir + '/templates/views/*.{hbs,html}',
    includes: srcDir + '/templates/views/partials/**/*.{hbs,html}',
    data: srcAssetsDir + '/data/**/*.{json,yaml,yml}',
    scripts: srcAssetsDir + '/js/**/*.{js,jsx}',
    styles: srcAssetsDir + '/scss/**/*.{sass,scss}',
    images: srcAssetsDir + '/images/**/*.{gif,jpg,jpeg,png,svg,tiff}',
    fonts: srcAssetsDir + '/fonts/**/*',
    staticjs: srcAssetsDir + '/js/**/*'
  },

  dest: {
    base: destDir,
    assets: destAssetsDir,
    scripts: destAssetsDir + '/js',
    styles: destAssetsDir + '/css',
    images: destAssetsDir + '/images',
    fonts: destAssetsDir + '/fonts',
    staticjs: destAssetsDir + '/js',
    productionDir: 'static'
  },

  images: {
      progressive: true,
      optimizationLevel: 3,
      svgoPlugins: [
          { removeViewBox: false },               // 3a
          { removeUselessStrokeAndFill: false },  // 3b
          { removeEmptyAttrs: false }             // 3c
      ],
      use: [
        imageminMozjpeg({
          progressive: true,
          quality: 80
        })
      ]
  },

  sass: {
    autoprefixer: {
      // you could use ['last 2 version'] instead of listing out browser specifics
      browsers: [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 32',
        'safari >= 6',
        'opera >= 23',
        'ios >= 6',
        'android 2.3',
        'android >= 4.3',
        'bb >= 10'
      ]
    },
    settings: {
      indentedSyntax: false, // true enables .sass indented syntax
      imagesPath: 'public/images' // used by the image-url helper
    }
  },

  scriptBundles: [
    {
      entries: srcAssetsDir + '/js/main.js',
      dest: destAssetsDir + '/js',
      outputName: 'main.bundle.js',
      require: ['jquery'],
      debug: true
    },
    {
      name: 'vendor',
      entries: srcAssetsDir + '/js/vendor.js',
      dest: destAssetsDir + '/js', 
      outputName: 'vendor.bundle.js'
    }

    
  ],
  browserSync: {
    server: {
      baseDir: [destDir, 'styleguide'],
      routes: {
        '/styleguide': 'styleguide'
      }
    },
    startPath: '/',
    snippetOptions: {
      ignorePaths: ['styleguide', 'styleguide/*.html']
    },
    browsers: ['google chrome'],
    notify: true,
    logPrefix: 'SERVER'
  }
};
