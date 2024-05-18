"use strict";

var input = document.getElementById('input'), // tombol input/output
  number = document.querySelectorAll('.numbers div'), // tombol angka
  operator = document.querySelectorAll('.operators div'), // tombol operator
  result = document.getElementById('result'), // tombol sama dengan
  clear = document.getElementById('clear'), // tombol hapus
  resultDisplayed = false; // status hasil ditampilkan

// menambahkan handler klik ke tombol angka
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // jika hasil belum ditampilkan, tambahkan angka
    if (!resultDisplayed) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed && (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷")) {
      // jika hasil ditampilkan dan operator ditekan, tambahkan ke string
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // jika hasil ditampilkan dan angka ditekan, reset input dan tambahkan angka
      resultDisplayed = false;
      input.innerHTML = e.target.innerHTML;
    }
  });
}

// menambahkan handler klik ke tombol operator
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // jika karakter terakhir adalah operator, ganti dengan yang baru
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      input.innerHTML = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
    } else if (currentString.length == 0) {
      // jika tombol pertama yang ditekan adalah operator, tidak lakukan apa-apa
      console.log("masukkan angka terlebih dahulu");
    } else {
      // tambahkan operator ke input
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// klik tombol '='
result.addEventListener("click", function() {
  var inputString = input.innerHTML;

  // buat array angka
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // buat array operator
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // lakukan operasi satu per satu: bagi, kali, kurang, tambah
  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // tampilkan hasil

  resultDisplayed = true; // setel status hasil ditampilkan
});

// hapus input saat tombol hapus ditekan
clear.addEventListener("click", function() {
  input.innerHTML = "";
});
