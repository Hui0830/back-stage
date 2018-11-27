// import { hashHistory } from 'react-router-dom';
import menu from '../conf/menu';

// export const navTo = hash => (hashHistory.push(hash));

export const openNewTab = url => window.open(url, '_blank');

export const loadAsync = dependency => (location, callback) => {
    dependency()
        .then(module => callback(null, module))
        .catch(e => console.error('Could not load route component', e));
};

export const getFirstSubMenuHref = (key) => {
    const { subMenu } = menu[key];
    const keys = Object.keys(subMenu);
    if (keys.length === 0) {
        throw new Error(`menu.${key}.subMenu是一个空对象`);
    } else {
        return subMenu[keys[0]] && subMenu[keys[0]].href;
    }
};