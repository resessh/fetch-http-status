'use strict';
require('source-map-support').install();

import * as fs from 'fs';
import * as request from 'request';


if (!process.argv[2]) {
    console.error('There is no file path args.');
    process.exit();
}
const urlListFilePath = process.argv[2];
const intervalTime = 300;
const tty = fs.createWriteStream('/dev/tty');

function readTxtFile(filePath): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, string) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(string.split('\n'));
        });
    });
}


type urlStatus = {
    url: string,
    status: number
};

function fetchHttpStatus(url: string): Promise<urlStatus> {
    return new Promise((resolve, reject) => {
        request(url, { method: 'HEAD' }, (err, res) => {
            setTimeout(() => {
                if (err) {
                    resolve({ url, status: err.statusCode });
                    return;
                }
                resolve({ url, status: res.statusCode });
            }, intervalTime);
        })
    });
}

readTxtFile(urlListFilePath)
    .catch((err) => {
        console.log(err);
        process.exit();
    })
    .then((urls: string[]) => {
        return urls.reduce<Promise<urlStatus | void>>((promise: Promise<urlStatus>, url, index, valList) => {
            return promise.then((urlStatus: urlStatus) => {
                return fetchHttpStatus(url).then((urlStatus: urlStatus) => {
                    tty.write(`'${urlStatus.url}', '${urlStatus.status}'\n`);
                    console.log(`'${urlStatus.url}', '${urlStatus.status}'`);
                });
            });
        }, Promise.resolve())
    })