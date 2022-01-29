const container = document.querySelector(".container");
const hamper = document.querySelector("#hamper");
const hamperContainer = document.querySelector(".hamper-container");
let content = [];
let values = [];


const getFetch = () => {
    const url = 'https://fakestoreapi.com/products';

    fetch(url)
      .then(item => {  
          return item.json();
      })
      .then(result => {
          content.push(result);
          return getContent(content);
      })
      .catch(err => {
          console.log(err);
      })
}

const getContent = (content) => {
    content.forEach(item => {
        item.forEach(value => {
            getList(value.title,value.category,value.price,value.image);
        }
        )
    })

}


const getList = (title,category,price,image) => {
    const card = document.createElement("div");
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const img = document.createElement("img");
    const cardTitle = document.createElement("h2");
    const categoryName = document.createElement("small");
    const cost = document.createElement("span");
    const button = document.createElement("button");

    let titleShort = title.slice(0,20);

    img.src = image;
    cardTitle.innerHTML = title.length > 20 ? titleShort + "..." : title;
    categoryName.innerHTML = category;
    cost.innerHTML = `${price} TL`;
    button.classList.add("fas","fa-shopping-basket");
    button.innerText =`  Add to Basket`;



    button.addEventListener("click",getBasket);

    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    card.appendChild(cardTitle);
    card.appendChild(categoryName);
    card.appendChild(cost);
    card.appendChild(button);
    container.appendChild(card);
}

hamper.addEventListener("click",() => {
    if(hamper.classList.contains("fa-shopping-basket")){
        hamper.classList.remove("fa-shopping-basket");
        hamper.classList.add("fa-times");
        hamper.style.color = "red";
        hamperContainer.style.display = "block";
    }else{
        hamper.classList.remove("fa-times");
        hamper.classList.add("fa-shopping-basket");
        hamper.style.color = "lime";
        hamperContainer.style.display = "none";
    }
})

const getBasket = (e) => {
    hamper.style.backgroundColor = "lime";
    hamper.style.color = "darkgreen";
    setTimeout(() => {
        hamper.style.backgroundColor = "#444";
        hamper.style.color = "lime";
    },1000);

    let target = e.target.parentElement;
    values = [];
    values.push(target);

    values.forEach(item => {
       const newCard = document.createElement("div");
       newCard.classList.add("newCard");

       const newImgContainer = document.createElement("div");

       const newImg = document.createElement("img");
       newImg.src = item.firstChild.firstChild.src;


       const newTitle = document.createElement("h2");
       newTitle.innerHTML = item.firstChild.nextElementSibling.innerText;

       const newCategory = document.createElement("small");

       newCategory.innerHTML = item.lastChild.previousElementSibling.previousElementSibling.innerText;

       const newPrice = document.createElement("span");
       newPrice.innerHTML = item.lastChild.previousElementSibling.innerText;

       const newButton = document.createElement("button");
       newButton.classList.add("fas","fa-trash-alt");
       newButton.innerHTML = "  Remove";

        newButton.addEventListener("click",(e) => {
           let target = e.target.parentElement;

           if(target.classList[0] === "newCard"){
               target.remove();
               hamper.style.backgroundColor = "red";
               hamper.style.color = "darkred";
               values.pop();
               console.log(values);
               setTimeout(() => {
                   hamper.style.backgroundColor = "#444";
                   hamper.style.color = "red";
               },1000);
           }
       })
 
       newImgContainer.appendChild(newImg);
       newCard.appendChild(newImgContainer);
       newCard.appendChild(newTitle);
       newCard.appendChild(newCategory);
       newCard.appendChild(newPrice);
       newCard.appendChild(newButton);
       hamperContainer.appendChild(newCard);
    })
}


getFetch();