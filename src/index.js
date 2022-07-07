// write your code here


fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(data => {
    uploadFirstPicture(data)
    uploadMenu(data)
})

const updateMainPicture=(ramen)=>{
    let detailImage = document.querySelector('.detail-image')
    detailImage.setAttribute("src", ramen.image)
    document.querySelector('.name').textContent = ramen.name
    document.querySelector('.restaurant').textContent = ramen.restaurant
    document.getElementById('rating-display').textContent = ramen.rating
    document.getElementById('comment-display').textContent = ramen.comment
}

const uploadFirstPicture = (data) => {
    updateMainPicture(data[0])
}

const deleteRamen = (ramenId) =>{
    fetch(`http://localhost:3000/ramens/${ramenId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'}
    })
}



const uploadMenu = (data) => {
    data.forEach(dish =>{
        let menu = document.getElementById('ramen-menu')
        let dishImg = document.createElement('img')
        dishImg.setAttribute('src', dish.image)
        let btn = document.createElement('button')
        btn.textContent = 'Remove'
        btn.addEventListener('click', ()=>{
            btn.remove()
            dishImg.remove()
            deleteRamen(dish.id)
        })
        menu.append(dishImg, btn)
        dishImg.addEventListener('click', ()=>{
            updateMainPicture(dish)
            // I am not sure if I should call this function now
            // updateCommentRating(dish.id)
        })      
    })
}

const updateCommentRating=(id)=>{
    
    // ID here
    // let id = document.getElementsByTagName('h3').id
    // console.log("works1")
    let update = document.getElementById('edit-ramen')
    update.addEventListener('submit', (e)=>{
        console.log(id)
        e.preventDefault()
        console.log('work2')
        let newComment = document.querySelector('#edit-ramen > #new-comment')
        let newRating = document.querySelector('#edit-ramen > #new-rating')
        // console.log(newRating.value, newComment.value)
        document.getElementById('rating-display').textContent = newRating.value
        document.getElementById('comment-display').textContent = newComment.value
        let newObj = {
                rating: newRating.value,
                comment: newComment.value
        }
        console.log(newObj)
        fetch(`http://localhost:3000/ramens/${id}`,{
            method:"PATCH",
            header:{
                'Content-Type': 'application/json',
                'Accept':'application.json'
            },
            body:JSON.stringify(newObj)          
        }).then(res => res.json())
        .then(data => uploadMenu(data))
        
    })

}

const addNewRamen = () => {
    let submit = document.querySelector('#new-ramen')
    submit.addEventListener('submit', (e) =>{
        e.preventDefault()
        // console.log('submitted')
        let newName = document.getElementById('new-name')
        let newRestauran = document.getElementById('new-restaurant')
        let newImg = document.getElementById('new-image')
        let newRating = document.getElementById('new-rating')
        let newComment = document.getElementById('new-comment')
        let menu = document.getElementById('ramen-menu')
        let newRamen = {
            name:newName.value,
            restaurant:newRestauran.value,
            image: newImg.value, 
            rating:newRating.value, 
            comment:newComment.value
        }
        
        fetch('http://localhost:3000/ramens', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application.json'
            },
            body: JSON.stringify(newRamen)
        }).then(res => res.json)
        .then(ramen => uploadMenu(ramen))



    })

}




addNewRamen()


