
let str;
let ascCode = [];
let convertedBox = [];
let convertedStr = "";

function convert(){

  str = document.getElementById("beforeConvert").value;
  for(let i = 0; i < str.length; i++){
    ascCode.push(str.charCodeAt(i));
  }

  for(let i = 0; i < str.length; i++){
    if(ascCode[i] >= 97 && ascCode[i] <= 122){
      ascCode[i] = ascCode[i] - 32;
      convertedBox.push(String.fromCharCode(ascCode[i]));
    }else{
      convertedBox.push(String.fromCharCode(ascCode[i]));
    }
  }

  // console.log(ascCode);
  // console.log(convertedBox);
  for(let i = 0; i < convertedBox.length; i++){
    convertedStr += convertedBox[i];
  }

  // console.log(convertedBox);
  // console.log(convertedStr);

  document.getElementById("converted").innerHTML = convertedStr;


  ascCode.splice(0, ascCode.length);
  convertedBox.splice(0, convertedBox.length);
  convertedStr = "";
}
