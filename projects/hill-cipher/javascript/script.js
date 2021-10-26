// variables and what not
let message = {
    content: "",
    array: [],
    output: "",
};

let encoding_matrix = {
    array: [],
    det: 0,
    inverse: [],
    recip_mod: 0,
};

let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let determinate_values =    [1,3,5,7,9,11,15,17,19,21,23,25];
let mod26_values =          [1,9,21,15,3,19,7,23,11,5,17,25];

function encode() {
    encoding_matrix.array = [];
    message.array = [];
    // this is terrible, and i hate it, but it works
    let y = new Array();
    y.push(parseInt(document.getElementById('encoding_matrix_a').value));
    y.push(parseInt(document.getElementById('encoding_matrix_b').value));
    encoding_matrix.array.push(y);
    let z = new Array();
    z.push(parseInt(document.getElementById('encoding_matrix_c').value));
    z.push(parseInt(document.getElementById('encoding_matrix_d').value));
    encoding_matrix.array.push(z);

    encoding_matrix.det = (encoding_matrix.array[0][0]*encoding_matrix.array[1][1])-(encoding_matrix.array[0][1]*encoding_matrix.array[1][0]);

    if(encoding_matrix.det < 0) {
        for(;encoding_matrix.det < 0;) {
            encoding_matrix.det += 26;
        }
    } else if(encoding_matrix.det > 26) {
        for(;encoding_matrix.det -= 26;);
    };

    if(encoding_matrix.det % 2 == 0 || encoding_matrix.det % 13 == 0 || !document.getElementById('encoded_message_input').value) {
        window.alert('Invalid input: The encoding matrix determinate cannot be divisible by 2 or 13');
    };
    message.content = document.getElementById('encoded_message_input').value.toString().toUpperCase();
    
    // Check if the message is of an even length, if not, repeat the last character
    let arr = message.content.split('');
    if(message.content.split('').length % 2 != 0) {
        arr.push([arr[arr.length-1]].toString());
    };

    // Creates multiple smaller arrays in a larger array. Splits into pairs of letters.
    for(a=1; a<message.content.length+2; a++) {
        if(a % 2 == 0) {
            let b = new Array();
            b.push(arr[a-2]);
            b.push(arr[a-1]);
            message.array.push(b);
        };
    };

    // Replaces each letter with it's corresponding number
    for(c=0; c < message.array.length; c++) {
        for(d=0; d < 2; d++) {
            for(e=0; e < 26; e++) {
                if(message.array[c][d].toString() == 'Z') {
                    message.array[c][d] = "0";
                    console.log("test");
                } else if (message.array[c][d] == alphabet[e]) {
                    message.array[c][d] = e+1;
                }
            };
        };
    };

    // encodes each letter
    document.getElementById('output').innerHTML = "";
    message.output = "";
    for(f=0; f < message.array.length; f++) {
        for(g=0; g < 2; g++) {
            var h = '';
            for(h = parseInt(encoding_matrix.array[g][0]*message.array[f][0])+(encoding_matrix.array[g][1]*message.array[f][1]);h > 26;) {
                h -= 26;
            };
            message.output += alphabet[h-1];
        };
    };

    document.getElementById('output').innerHTML = message.output;
};

function decode() {
    encoding_matrix.array = [];
    message.array = [];
    // initial checks to see if all values are inputted, and if the encoding matrix's determinate is valid
    // this is terrible, and i hate it, but it works
    let i = new Array();
    i.push(parseInt(document.getElementById('encoding_matrix_a').value));
    i.push(parseInt(document.getElementById('encoding_matrix_b').value));
    encoding_matrix.array.push(i);
    let j = new Array();
    j.push(parseInt(document.getElementById('encoding_matrix_c').value));
    j.push(parseInt(document.getElementById('encoding_matrix_d').value));
    encoding_matrix.array.push(j);

    encoding_matrix.det = ((encoding_matrix.array[0][0]*encoding_matrix.array[1][1])-(encoding_matrix.array[0][1]*encoding_matrix.array[1][0]));

    if(encoding_matrix.det < 0) {
        for(;encoding_matrix.det < 0;) {
            encoding_matrix.det += 26;
        };
    } else if(encoding_matrix.det > 26) {
        for(;encoding_matrix.det > 26;) {
            encoding_matrix.det -= 26;
        };
    };

    if(encoding_matrix.det == 2 || encoding_matrix.det == 13 || !document.getElementById('encoded_message_input').value) {
        console.log('err');
    };
    for(k=0; k<determinate_values.length-1; k++) {
        if(encoding_matrix.det == determinate_values[k]) {
            encoding_matrix.recip_mod = mod26_values[k];
        };
    };

    // more absolutely garbage code >:(
    // applied the inverse rules, and multiplies them by the determinate of the encoding matrix
    let l = new Array();
    l.push(parseInt(encoding_matrix.array[1][1]) * encoding_matrix.recip_mod);
    l.push(parseInt(-encoding_matrix.array[0][1]) * encoding_matrix.recip_mod);
    encoding_matrix.inverse.push(l);
    let m = new Array();
    m.push(parseInt(-encoding_matrix.array[1][0]) * encoding_matrix.recip_mod);
    m.push(parseInt(encoding_matrix.array[0][0]) * encoding_matrix.recip_mod);
    encoding_matrix.inverse.push(m);

    for(n=0; n<2; n++) {
        for(o=0; o<2; o++) {
            if(encoding_matrix.inverse[n][o] < 0) {
                for(;encoding_matrix.inverse[n][o] < 0;) {
                    encoding_matrix.inverse[n][o] += 26;
                }
            } else if (encoding_matrix.inverse[n][o] > 26) {
                for(;encoding_matrix.inverse[n][o] > 26;) {
                    encoding_matrix.inverse[n][o] -= 26;
                };
            };
        };
    };
    message.content = document.getElementById('encoded_message_input').value.toString().toUpperCase();
    
    // Check if the message is of an even length, if not, repeat the last character
    let arr = message.content.split('');
    if(message.content.split('').length % 2 != 0) {
        arr.push([arr[arr.length-1]].toString());
    };

    // Creates multiple smaller arrays in a larger array. Splits into pairs of letters.
    for(p=1; p<message.content.length+2; p++) {
        if(p % 2 == 0) {
            let q = new Array();
            q.push(arr[p-2]);
            q.push(arr[p-1]);
            message.array.push(q);
        };
    };

    // Replaces each letter with it's corresponding number
    for(r=0; r < message.array.length; r++) {
        for(s=0; s < 2; s++) {
            for(t=0; t < 26; t++) {
                if(message.array[r][s] == 'Z') {
                    message.array[r][s] = 0;
                } else if (message.array[r][s] == alphabet[t]) {
                    message.array[r][s] = t+1;
                }
            };
        };
    };

    // decodes each letter
    document.getElementById('output').innerHTML = "";
    message.output = "";
    for(u=0; u < message.array.length; u++) {
        for(v=0; v < 2; v++) {
            var w; 
            for(w = parseInt(encoding_matrix.inverse[v][0]*message.array[u][0])+(encoding_matrix.inverse[v][1]*message.array[u][1]);w > 26;) {
                w -= 26;
            };
            message.output += alphabet[w-1];
        };
    };

    document.getElementById('output').innerHTML = message.output;
};
