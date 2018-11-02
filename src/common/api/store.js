export const getValidDateInfo = () => {
    return fetch('/api/reqInfo',{
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => {
        return res.json();
    })
}

export const getSkuInfo = (pramer) => {
    return fetch('/api/getSkuInfo',{
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(pramer),
    }).then(res => {
        return res.json();
    })
}

export default {getValidDateInfo, getSkuInfo}