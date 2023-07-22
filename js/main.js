document.querySelector(".control-buttons span").onclick = () => {
    let yourName = prompt("what's Your Name");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown"
    }else {
        document.querySelector(".name span").innerHTML = yourName
    }
    document.querySelector(".control-buttons").remove();
}

let duration = 1000;

let blocksContainer = document.querySelector(".memory-blocks");
let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, i) => {
    block.style.order = orderRange[i];
    block.addEventListener("click", function () {
        flipBlock(block);
    })
})

function shuffle(array) {
    let current = array.length;
    let temp, random;

    while ( current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp
    }
    return array;
}

function flipBlock(selected) {
    selected.classList.add("is-flipped");

    let allFlipped = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    if (allFlipped.length === 2) {
        stopClicking();

        check(allFlipped[0], allFlipped[1]);
    }
}
function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration)
}

function check(first, sec) {
    let triesElement = document.querySelector(".tries span");
    if (first.dataset.technology === sec.dataset.technology) {
        first.classList.remove('is-flipped');
        sec.classList.remove('is-flipped');

        first.classList.add('has-match');
        sec.classList.add('has-match');

    }else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            first.classList.remove('is-flipped');
            sec.classList.remove('is-flipped');
        }, duration)
    }
}