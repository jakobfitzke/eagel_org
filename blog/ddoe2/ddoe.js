var ddoe = {
    1: { fileName: 'start.jpg', desc: 'Eagel Update 2.0, Day 1:<br/>Guess who\'s back...' },
    2: { fileName: 'wall.jpeg', desc: 'Eagel Update 2.0, Day 2:<br/>Nothing special, just the Eagel enjoying a short moment of sunny weather that will trick the viewers into thinking that it didn\'t rain around _' },
    3: { fileName: 'letterbox.jpeg', desc: 'Eagel Update 2.0, Day 3:<br/>Special Delivery...' },
    4: { fileName: 'slide.jpeg', desc: 'Eagel Update 2.0, Day 4:<br/>Weeeeeee :D' },
    5: { fileName: 'swing.jpeg', desc: 'Eagel Update 2.0, Day 5:<br/>&#x1f643' },
    6: { fileName: 'crossbow.jpeg', desc: 'Eagel Update 2.0, Day 6:<br/>The Eagel went for a slightly more medieval version of his usual revolver today... hunting birds and other mean creatures, you know the deal.' },
    7: { fileName: 'eagirl.jpeg', desc: 'Eagel Update 2.0, Day 7:<br/>The Eagel turned into the Eagirl...  (sadly, the pink gaming setup is missing, but that wasn\'t that easy to borrow)' },
    8: { fileName: 'meal.jpeg', desc: 'Eagel Update 2.0, Day 8:<br/>Nom nom' },
    9: { fileName: 'fitness.jpeg', desc: 'Eagel Update 2.0, Day 9:<br/>The Eagel doing some sports on the Eagle-thingy<br/>(And before you think I\'m going to the gym: Nah)<br/>(But the Eagel does) ' },
    10: { fileName: 'magazine.jpeg', desc: 'Eagel Update 2.0, Day 10:<br/>Here you see a spiky ball of floof reading his favourite magazine' },
    11: { fileName: 'mariokart.jpeg', desc: 'Eagel Update 2.0, Day 11:<br/>✨Mariokart with friends ✨' },
    12: { fileName: 'bus.jpeg', desc: 'Eagel Update 2.0, Day 12:<br/>Here you see the Eagel driving around in the neighbourhood of Lahr' },
    13: { fileName: 'train.jpeg', desc: 'Eagel Update 2.0, Day 13:<br/>Speeeeed' },
    14: { fileName: 'coast.jpeg', desc: 'Eagel Update 2.0, Day 14:<br/>The Eagel struggled with not getting blown away by the wind, but in the end he could hold on for long enough for me to take a photo 😆' },
    15: { fileName: 'jet.jpg', desc: 'Eagel Update 2.0, Day 15:<br/>The Eagel got his own little jet now :)<br/>(Please appreciate the fact that I overcame social anxiety to ask the museum staff if I can take this photo... 😅)<br/>That\'s what he\'s sitting in:', image: 'info.jpeg' },
    16: { fileName: 'furnace.jpeg', desc: 'Eagel Update 2.0, Day 16:<br/>Hmm comfy' },
    17: { fileName: 'stars.jpeg', desc: 'Eagel Update 2.0, Day 17:<br/>Watching the, uhh... whatever "Perseiden" is in English' },
    18: { fileName: 'backpack.jpeg', desc: 'Eagel Update 2.0, Day 18:<br/>travelling again...' },
    19: { fileName: 'hbf.jpeg', desc: 'Eagel Update 2.0, Day 19:<br/>Ahhhhh still on the way' },
    20: { fileName: 'garden.jpeg', desc: 'Eagel Update 2.0, Day 20:<br/>The smol Eagol went on a little adventure in the gardens of _' },
    21: { fileName: 'nom.jpeg', desc: 'Eagel Update 2.0, Day 21:<br/>Om nom nom' },
    22: { fileName: 'big gun.jpeg', desc: 'Eagel Update 2.0, Day 22:<br/>Eagel is ready to defend the Skies of Germany from the "Rat der sieben weisen Vögel"' },
    23: { fileName: 'weee.jpg', desc: 'Eagel Update 2.0, Day 23:<br/>weeeee :)' },
    24: { fileName: 'spiky.jpeg', desc: 'Eagel Update 2.0, Day 24:<br/>Found a spiky friend :)' },
    25: { fileName: 'train_smol.jpg', desc: 'Eagel Update 2.0, Day 25:<br/>family trip' },
}

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
    slideImg.setAttribute("src", "../../src/blog/ddoe2/" + ddoe[slideIndex]['fileName'])
    captionText.innerHTML = ddoe[slideIndex]['desc']
    if (Object.keys(ddoe[slideIndex]).includes('image')) {
        image = ddoe[slideIndex]['image']
        captionText.innerHTML += "<br/><br/><img style='max-width: 50%' src='../../src/blog/ddoe2/" + image + "'/>"
    }
}

function galleryInit() {
    slideIndex = Object.keys(ddoe).length;
    showSlides(Object.keys(ddoe).length)
}

var slideIndex