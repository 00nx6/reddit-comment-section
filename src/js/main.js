const genCont = document.querySelector('.genCont');

const imgSrc = {
    amyrobson : require('./images/avatars/image-amyrobson.png'),
    juliusomo : require("./images/avatars/image-juliusomo.png"),
    maxblagun : require("./images/avatars/image-maxblagun.png"),
    ramsesmiron : require('./images/avatars/image-ramsesmiron.png')
}
const getData  =async () => {
    const res = await fetch('https://raw.githubusercontent.com/00nx6/reddit-comment-section/main/src/js/data.json')
    if (res.status !== 200) {
        throw new Error('fetch request rejected: ');
    }
    const data = await res.json();
    return data;
}
getData()
    .then(data => dataHandler(data))
    .catch(err => console.log(err))


function dataHandler(json){
    json.comments.forEach(obj => {
        commentProfile(obj, false);
        if (Array.isArray(obj.replies) && obj.replies.length > 0) {
            obj.replies.forEach(obj => {
                commentProfile(obj, true)
            })
        }
        
    });
}

const commentProfile = (objData, isReply) => {
    const commentBody = document.createElement('section')
    commentBody.classList.add('comment')

    const userInfo = document.createElement('div')
    userInfo.classList.add('userInfo');

    const pfpCont = document.createElement('picture')
    const pfp = document.createElement('img')
    pfp.src = `${imgSrc[objData.user.username]}`
    pfpCont.append(pfp)
    userInfo.append(pfpCont)
    const userName = document.createElement('h2')
    userName.classList.add('username');
    userName.innerText = objData.user.username

    const leftAt = document.createElement('h3')
    leftAt.classList.add('leftOn')
    leftAt.innerText = objData.createdAt
    
    const commentPara = document.createElement('p')
    commentPara.classList.add('commentPara')

    
    if (isReply) {
        commentBody.classList.add('reply');
        const replyingToCont = document.createElement('span')
        replyingToCont.classList.add('replyAt')
        const replyingTo = document.createElement('h3')

        replyingTo.innerText = `@${objData.replyingTo}`

        replyingToCont.appendChild(replyingTo)
        commentPara.innerHTML = replyingToCont.outerHTML + objData.content
    } else commentPara.append(objData.content)
    
    const ratingCont = document.createElement('section')
    ratingCont.classList.add('rating')

    const votesCont = document.createElement('div')
    votesCont.classList.add('updownvotes')

    const upVote = document.createElement('button')
    upVote.classList.add('upVote')

    upVote.addEventListener('click', upVoteClick)

    const addSymbol = document.createElement('i')
    addSymbol.classList.add('plus')
    addSymbol.innerText = '+'

    const voteCount = document.createElement('h2')
    voteCount.classList.add('voteCount')
    voteCount.innerText = objData.score

    const downVote = document.createElement('button')
    downVote.classList.add('downVote')

    downVote.addEventListener('click', downVoteClick) 

    const minusSymbol = document.createElement('i')
    minusSymbol.classList.add('minus')
    minusSymbol.innerText = '-'

    
    commentBody.appendChild(userInfo)
    commentBody.appendChild(commentPara)
    commentBody.appendChild(ratingCont)
    userInfo.append(userName)
    userInfo.append(leftAt)
    ratingCont.appendChild(votesCont)
    votesCont.appendChild(upVote)
    upVote.appendChild(addSymbol)
    votesCont.appendChild(voteCount)
    votesCont.appendChild(downVote)
    downVote.appendChild(minusSymbol)

    genCont.appendChild(commentBody)
}

function upVoteClick() {
    if (this.nextElementSibling.classList.contains('upvoted')) {
        this.nextElementSibling.innerText--
        this.nextElementSibling.classList.remove('upvoted')
    } else {
        this.nextElementSibling.innerText++
        this.nextElementSibling.classList.add('upvoted')   
    }
}

function downVoteClick() {      
    if (this.previousElementSibling.classList.contains('downvoted')) {
        this.previousElementSibling.innerText++
        this.previousElementSibling.classList.remove('downvoted')
    } else {
        this.previousElementSibling.innerText--
        this.previousElementSibling.classList.add('downvoted')   
    }
}


