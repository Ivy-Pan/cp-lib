// import axios from 'axios';
// import typeOf from './typeOf';

/**
 * request
 *  • new class： interceptor、createOptions
 *  • instance：
 *  • options（callback）、
 *  • callback、
 *  • then、catch、
 *  • get/post/del/put：（options（callback）、callback、then、catch）
 *  • setHeader、setHeaders
 *  • response：blob（image、xls）、message、expire
 */

class Request {}

// const _DISPLAY_NAME = 'axios_request';
// const createRequest = async function ({
//   createOption,
//   requestInterceptor,
//   responseInterceptor
// }) {
//   if (!createOption && !process.env.BASE_API) {
//     return Promise.reject(new Error('missing the baseURL'));
//   }

//   const _createOption = {
//     baseURL: process.env.BASE_API,
//     timeout: 5 * 1000,
//   };
//   const service = axios.create(Object.assign(_createOption, createOption || {}));

//   service._DISPLAY_NAME = _DISPLAY_NAME;

//   // request interceptor
//   service.interceptors.request.use(
//     config => {
//       if (requestInterceptor) {
//         const type = typeOf(requestInterceptor);
//         if (type === 'function') {
//           requestInterceptor(config);
//         } else if (type === 'object') {
//           Object.assign(config.headers, requestInterceptor);
//         }
//       }

//       return config;
//     },
//     error => Promise.reject(error),
//   );

//   // response interceptor
//   service.interceptors.response.use(
//     response => {},
//     error => {},
//   );

//   return service;
// };

export default Request;
