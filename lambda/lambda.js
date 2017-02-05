const AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
const im = require('imagemagick');
const fs = require('fs');
const s3 = new AWS.S3();

const rand = () => Math
    .random()
    .toString(36)
    .substring(2, 12) + Math
    .random()
    .toString(36)
    .substring(2, 12);

exports.handler = (event, context, callback) => {

    // event.thumbnailType ('t120','t360')
    if ((event.thumbnailType !== 't120') && (event.thumbnailType !== 't360')) {
        if (callback) {
            return callback(new Error('Missing thumbnail type!'));
        } else {
            return context.fail('Missing thumbnail type!');
        }
    }

    const thType = event.thumbnailType === 't120'
        ? 120
        : 360;

    //read image
    const buffer = new Buffer((event.file || '').replace(/^data:image\/\w+;base64,/, ""), 'base64')

    // Random new key for filename
    const key = rand();

    // Write original file to disk
    fs.writeFileSync('/tmp/_' + key, buffer);

    // read and identify image
    im.identify('/tmp/_' + key, (err, res) => {

        // if not recognised return error
        if (err || !res || !res.format || !res.width || !res.height) {
            if (callback) {
                return callback(new Error('File not recognised as image!'));
            } else {
                return context.fail('File not recognised as image!');
            }
        } else {
            //Resize image calculating new width and height
            const format = (res.format).toLowerCase();
            const scalingFactor = Math.min(thType / res.width, thType / res.height);
            const width = scalingFactor * res.width;
            const height = scalingFactor * res.height;
            im.resize({
                srcPath: '/tmp/_' + key,
                dstPath: '/tmp/' + key,
                width,
                height
            }, function (err) {
                if (err) {
                    if (callback) {
                        return callback(new Error('File cannot be resized!'));
                    } else {
                        return context.fail('File cannot be resized!');
                    }
                } else {

                    // Bucket Key
                    const newKey = event.thumbnailType + '/' + key + '.' + format;
                    if (callback) {
                        s3.putObject({
                            Bucket: 'italist',
                            Key: newKey,
                            Body: fs.createReadStream('/tmp/' + key),
                            ContentType: 'image/' + format
                        }, (err) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, newKey);
                            };
                        });
                    } else {
                        return context.succeed(newKey);
                    }
                };
            });

        }
    });

};