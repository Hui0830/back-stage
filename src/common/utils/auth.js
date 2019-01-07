import jsCookie from 'js-cookie';

export  const getIsAuth = () => {
    const account = jsCookie.get('account');
    const token = localStorage.getItem('token');
	const token_exp = localStorage.getItem('token_exp');
	const now_time = new Date().getTime();
    if (account && token && now_time - token_exp <= 1000 * 60 * 60 * 60 * 2) {
        console.info('登入状态未过期')
        return true;
    } else {
        console.info('登入状态过期')
        return false;
    }
}