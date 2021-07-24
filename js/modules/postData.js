const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: data,
    });
    return await res.json();
};

export default postData;