var binAlpha = {
    'a': 97,
    'b': 98,
    'c': 99,
    'd': 100,
    'e': 101,
    'f': 102,
    'g': 103,
    'h': 104,
    'i': 105,
    'j': 106,
    'k': 107,
    'l': 108,
    'm': 109,
    'n': 110,
    'o': 111,
    'p': 112,
    'q': 113,
    'r': 114,
    's': 115,
    't': 116,
    'u': 117,
    'v': 118,
    'w': 119,
    'x': 120,
    'y': 121,
    'z': 122,
    '.': 46,
}

function convert(fileName) {
    var word = fileName.toLowerCase();
    var binWordArr = [];
    var binWord = "";
    var wordSplit = word.split("");

    for (let letter in wordSplit) {

        let iter = binAlpha[wordSplit[letter]];
        binWordArr = [];

        for (let i = 1; i <= 8; i++) {

            if (iter % 2 == 1) {
                binWordArr.push(1);
            }

            else if (iter % 2 == 0) {
                binWordArr.push(0);
            }

            iter = Math.floor(iter / 2);
        }

        binWord += binWordArr.reverse().join("");
        binWord += " ";
    }

    return binWord;
}

convert();