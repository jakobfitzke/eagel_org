var ddoe = {
    1: { fileName: 'spiky.jpg', desc: 'Eagel Update, Day 1:<br/>Enjoying the day with his spiky friends!' },
    2: { fileName: 'lockers.jpeg', desc: 'Eagel Update, Day 2:<br/>Wait, why does it smell like cheese here (if you don\'t get the context, you\'re lucky)' },
    3: { fileName: 'seminary.jpeg', desc: 'Eagel Update, Day 3:<br/>The Eagel loves watching people struggle with things he won\'t need to care about' },
    4: { fileName: 'cat.jpg', desc: 'Eagel Update, Day 4:<br/>My cat knows how to bow properly to the Eagel' },
    5: { fileName: 'bike.jpeg', desc: 'Eagel Update, Day 5:<br/>Ready to go on a road trip!' },
    6: { fileName: 'GG.jpeg', desc: 'Eagel Update, Day 6:<br/>Interesting what rules apply to humans... But I can\'t find anything about Eagels hehe' },
    7: { fileName: 'inside.jpeg', desc: 'Eagel Update, Day 7:<br/>Pretty dark here in the locker... Luckily there are cereal bars!' },
    8: { fileName: 'Waffle.jpeg', desc: 'Eagel Update, Day 8:<br/>Look at our spiky friend getting some waffles at the local supermarket.' },
}

// n: { fileName: '', desc: 'Eagel Update, Day n:<br/>', image: '' },

function createHtml(index) {
    let fileName = ddoe[index]['fileName']
    let desc = ddoe[index]['desc']
    let image = null
    if (Object.keys(ddoe[index]).includes('image')) {
        image = ddoe[index]['image']
    }
    console.log(image)
}

createHtml(3)

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slide = document.getElementById("slide");
    let captionText = document.getElementById("caption");
    let numberText = document.getElementById("numbertext");
    let slideImg = document.getElementById("slideimg");
    if (n > Object.keys(ddoe).length) { slideIndex = 1 }
    if (n < 1) { slideIndex = Object.keys(ddoe).length }
    numberText.innerHTML = "" + slideIndex + "/" + (Object.keys(ddoe).length)
    slideImg.setAttribute("src", "../src/ddoe3/" + ddoe[slideIndex]['fileName'])
    captionText.innerHTML = ddoe[slideIndex]['desc']
    if (Object.keys(ddoe[slideIndex]).includes('image')) {
        image = ddoe[slideIndex]['image']
        captionText.innerHTML += "<br/><br/><img style='max-width: 50%' src='../src/ddoe3/" + image + "'/>"
    }
    /*let i;
    let slides = document.getElementsByClassName("mySlides");
    let captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    captionText.innerHTML = dots[slideIndex - 1].alt;*/
}

function galleryInit() {
    slideIndex = Object.keys(ddoe).length;
    showSlides(Object.keys(ddoe).length)
}

var slideIndex