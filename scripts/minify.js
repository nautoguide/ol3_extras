var compressor = require('node-minify');

var files=[
    "libs/ol3_extras.js"
];

new compressor.minify({
    type: 'gcc',
    fileIn: files,
    fileOut: 'ol3-extras.min.js',
    buffer: 100000 * 1024,
    callback: function(err, min){
        if(err)
            console.log('ERROR:'+err);
        else
            console.log('Built');
    }
});