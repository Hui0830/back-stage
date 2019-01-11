
// 
export const intersection = (arr1, arr2) => {
    let arr = [];
    arr1.forEach((item) => {
        if(arr2.includes(item)) {
            arr.includes(item) || arr.push(item);
        }
    });
    return arr;
}

class Lodash {
    get = (object, path, defaultValue = '') => {
        return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
                .reduce((o, k) => (o || {})[k], object) || defaultValue;
    }
}
export default new Lodash();