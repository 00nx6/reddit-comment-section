const genCont = document.querySelector('.genCont');

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
    console.log(json)
    json.comments.forEach(obj => commentProfile(obj));
}

const commentProfile = (objData) => {
    const commentBody = document.createElement('section')
    commentBody.classList.add('comment')
    /*
        div class=userInfo
            picture class=pfp
                img
            h2 class=username
            h3 class=lefton
        
        p class=commentPara

        section class=rating
            div class=updownvotes
                button class upVote
                    i class Plus
                h2 class voteCount
                button class downvote
                    i class minus
                
    */ 
    const userInfo = document.createElement('div')
    userInfo.classList.add('userInfo');

    const picCont = document.createElement('picture')
    picCont.classList.add('pfp')

    const pfpImg = document.createElement('img')
    pfpImg.src = objData.user.image.png
    
    const userName = document.createElement('h2')
    userName.classList.add('username');
    userName.innerText = objData.user.username

    const leftAt = document.createElement('h3')
    leftAt.classList.add('leftOn')
    leftAt.innerText = objData.createdAt

    const commentPara = document.createElement('p')
    commentPara.classList.add('commentPara')
    commentPara.innerText = objData.content

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

    const minusSymbol = document.createElement('i')
    minusSymbol.classList.add('minus')
    minusSymbol.innerText = '-'

    
    commentBody.appendChild(userInfo)
    commentBody.appendChild(commentPara)
    commentBody.appendChild(ratingCont)
    userInfo.append(picCont)
    userInfo.append(userName)
    userInfo.append(leftAt)
    picCont.append(pfpImg)
    ratingCont.appendChild(votesCont)
    votesCont.appendChild(upVote)
    upVote.appendChild(addSymbol)
    votesCont.appendChild(voteCount)
    votesCont.appendChild(downVote)
    downVote.appendChild(minusSymbol)

    genCont.appendChild(commentBody)
}