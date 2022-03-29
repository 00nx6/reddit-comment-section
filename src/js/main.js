const genCont = document.querySelector('.genCont');

const imgSrc = {
    amyrobson : "./images/avatars/image-amyrobson.png",
    "juliusomo" : "./images/avatars/image-juliusomo.png",
    "maxblagun" : "./images/avatars/image-maxblagun.png"
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
    
    const userName = document.createElement('h2')
    userName.classList.add('username');
    userName.innerText = objData.user.username

    const leftAt = document.createElement('h3')
    leftAt.classList.add('leftOn')
    leftAt.innerText = objData.createdAt
    
    const commentPara = document.createElement('p')
    commentPara.classList.add('commentPara')
    
    const commentText = objData.content
    
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

    const addSymbol = document.createElement('i')
    addSymbol.classList.add('plus')
    addSymbol.innerText = '+'

    const voteCount = document.createElement('h2')
    voteCount.classList.add('voteCount')
    voteCount.innerText = objData.score

    const downVote = document.createElement('button')
    downVote.classList.add('downVote')

    // downVote.addEventListener('click', upvote)

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

    voteBttns()
}


// make a seperate function for appending the comment, 
// so it can be reused for comments too
// if in the forEach loop, it finds comments to be a non empty array, 
// for every reply on the comment run the reply append function
// determine if its a reply by passing it on as a boolean

