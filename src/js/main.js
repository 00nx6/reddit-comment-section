// async function
const getData = async () => {
    const res = await fetch('https://raw.githubusercontent.com/00nx6/reddit-comment-section/main/src/data.json');
    if (res.status !== 200) {
        throw new Error('fetch rejected');
    }
    const data = await res.json();
    return data
}

getData()
    .then(data => test(data))
    .catch(err => console.log(err.message))

function test(data) {
    console.log(data)
    // :sunglasses: 
}