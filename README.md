# Freasy

Simple and efficient frontend development with Sass and Jade but without any unnecessary overhead. Pulls Foundation and jQuery through Bower.

## Directory structure

The `gulpfile.js` expects a specific directory structure. Change `gulpfile.js` directly to work with a different structure.

```
root
  | src
      | assets
      | img
      | jade
      | js
      | scss
```

For the JavaScript the default gulpfile pulls certain scripts such as jQuery or Foundation directly from the bower_components. Change this or add additional scripts directly in the gulpfile as needed.

## Main Gulp tasks

### `$ gulp serve`

Triggers all watch tasks to watch for changes of Sass, Jade, JavaScripts or any images and assets.

### `$ gulp`

Is the basic build command that builds/rebuilds the complete application.

### Individual tasks

* `$ gulp compile:sass` - to compile the sass into css
* `$ gulp minify:css`- uglifies css and is dependent on `compile:sass`
* `$ gulp concat:scripts` - puts together all scripts in the `/src/js` folder as well as any pulled directly from bower
* `$ gulp copy:scripts` - copies all scripts which are meant to be standalone and not concatenated (i.e. `modernizr.js`)
* `$ gulp minify:scripts` - uglifies the concatenated javscript and is therefore dependent on `concat:scripts`
* `$ gulp compile:jade` - to compile jade into html
* `$ gulp transfer:img` - copies all images
* `$ gulp transfer:assets` - copies all assets other than images
* `$ gulp clean` - removes the distribution completely by deleting the `dist` folder

# License

2015, Phil for Rhinerock.
MIT License