//phoneModel.js
// import MobileDetect from 'https://cdn.jsdelivr.net/npm/mobile-detect@1.4.5/+esm'
// import MobileDetect from "./node_modules/mobile-detect/mobile-detect-modernizr.js";
// const MobileDetect2 = require('mobile-detect')
// const getIphoneModel = require('./iPhone-detect.min.js')
// console.log("🚀 ~ file: index.js:3 ~ MobileDetect:", MobileDetect);
//@ts-ignore
// import {a} from './test.js'
// console.log("🚀 ~ file: index.js:9 ~ moduleName:", a)

import getIphoneModel from "./iPhone-detect.js";

// phoneModel()
console.log(getIphoneModel)
console.log('getIphoneModel', getIphoneModel())
// export default phoneModel;
