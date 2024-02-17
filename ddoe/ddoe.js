var ddoe = {
    1: { fileName: 'spiky.jpg', desc: 'Eagel Update, Day 1:<br/>Enjoying the day with his spiky friends!' },
    2: { fileName: 'lockers.jpeg', desc: 'Eagel Update, Day 2:<br/>Wait, why does it smell like cheese here (if you don\'t get the context, you\'re lucky)' },
    3: { fileName: 'seminary.jpeg', desc: 'Eagel Update, Day 3:<br/>The Eagel loves watching people struggle with things he won\'t need to care about' },
    4: { fileName: 'cat.jpg', desc: 'Eagel Update, Day 4:<br/>My cat knows how to bow properly to the Eagel' },
    5: { fileName: 'bike.jpeg', desc: 'Eagel Update, Day 5:<br/>Ready to go on a road trip!' },
    6: { fileName: 'GG.jpeg', desc: 'Eagel Update, Day 6:<br/>Interesting what rules apply to humans... But I can\'t find anything about Eagels hehe' },
    7: { fileName: 'inside.jpeg', desc: 'Eagel Update, Day 7:<br/>Pretty dark here in the locker... Luckily there are cereal bars!' },
    8: { fileName: 'Waffle.jpeg', desc: 'Eagel Update, Day 8:<br/>Look at our spiky friend getting some waffles at the local supermarket.' },
    9: { fileName: 'music.jpeg', desc: 'Eagel Update, Day 9:<br/>Listening to good old Rolling Stones music with his new buddy!' },
    10: { fileName: 'floof.jpeg', desc: 'Eagel Update, Day 10:<br/>The Eagel discovered a new species in this house. It seems he now has taken the leadership of the floof-gang!' },
    11: { fileName: 'map.jpeg', desc: 'Eagel Update, Day 11:<br/>The Eagel found my new world map and decided to find a new vacation destination!' },
    12: { fileName: 'horror.jpeg', desc: 'Eagel Update, Day 12:<br/>The Eagel found a bunch of old horror tapes. I think he actually found his favourite one...' },
    13: { fileName: 'magic.jpeg', desc: 'Eagel Update, Day 13:<br/>The Eagel tried some magic today... Hopefully he\'s not going to burn anything...he\'s quite strong...' },
    14: { fileName: 'membership.jpeg', desc: 'Eagel Update, Day 14:<br/>Today the Eagel helped me with the membership cards and we\'re making good progress! Maybe at the end of the week we\'ll be able to order them' },
    15: { fileName: 'goddess.jpeg', desc: 'Eagel Update, Day 15:<br/>Today, the Eagel befriended a goddess from another universe and used his hair as a nest for her...<br/>Didn\'t know he could that but it\'s definitely awesome' },
    16: { fileName: 'timetravel.jpeg', desc: 'Eagel Update, Day 16=17:<br/>Some critics may say, "Hannes forgot to post yesterday", but those people weren\'t as privilaged as I was yesterday.<br/>For the first time, I was able to watch the Eagel timetravel. Apparently yesterday and today is actually the same day!<br/>Isn\'t that awesome!!!' },
    17: { fileName: 'timetravel.jpeg', desc: 'Eagel Update, Day 17=16:<br/>Some critics may say, "Hannes forgot to post yesterday", but those people weren\'t as privilaged as I was yesterday.<br/>For the first time, I was able to watch the Eagel timetravel. Apparently yesterday and today is actually the same day!<br/>Isn\'t that awesome!!!' },
    18: { fileName: 'party.jpeg', desc: 'Eagel Update, Day 18:<br/>The Eagel, left behind as we did not take a group picture with him...<br/>Coordination somewhat disappointing, <b>7</b> people forgot him, we need to repay him that!' },
    19: { fileName: 'schtrong.jpeg', desc: 'Eagel Update, Day 19:<br/>He just spent all dax collecting THE POWER.<br/><br/>now he is very schtrong' },
    20: { fileName: 'gardening.jpeg', desc: 'Eagel Update, Day 20:<br/>Eagel giving his best at gardening...<br/>The Lego cactus hasn\'t died yet after three hours!<br/>He\'s so incredible, it\'s pure mastery' },
    21: { fileName: 'light.jpeg', desc: 'Eagel Update, Day 21:<br/>The Eagel helped me today with putting up LED-Lights!<br/>His Mini-Gun glowed really nice but sadly the camera didn\'t capture that quite right.' },
    22: { fileName: 'cactus.jpeg', desc: 'Eagel Update, Day 22:<br/>The Eagel and his simmilarly circular friend - the cactus!' },
    23: { fileName: 'pasta.jpeg', desc: 'Eagel Update, Day 23:<br/>To make the Eagel feal a little bit more at home, I placed him next to the offspring of his mama, the Spaghetti-Monster.<br/><br/><br/>(P. S. NO THIS IS NOT AN AD FOR A CERTAIN PASTA COMPANY' },
    24: { fileName: 'quotes.jpeg', desc: 'Eagel Update, Day 24:<br/>Onehundredandtwelve citations. I think the pig\'s whistling. That took too long' },
    25: { fileName: 'art.jpeg', desc: 'Eagel Update, Day 25:<br/>The Eagel is appreciating the highest arts!<br/><br/>Cultureeeee' },
    26: { fileName: 'kilt.jpeg', desc: 'Eagel Update, Day 26:<br/>Soooooooooooo fashionable' },
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