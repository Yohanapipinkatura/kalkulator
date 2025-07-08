// script.js

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const decimalButton = document.querySelector('.decimal');
    const clearButton = document.getElementById('clearBtn');
    const equalsButton = document.getElementById('equalsBtn');

    let currentInput = '0'; // Menyimpan angka yang sedang diinput
    let firstOperand = null; // Menyimpan angka pertama dalam perhitungan
    let operator = null; // Menyimpan operator yang dipilih
    let waitingForSecondOperand = false; // Flag untuk mengetahui apakah kita menunggu angka kedua

    // Fungsi untuk mengupdate tampilan kalkulator
    function updateDisplay() {
        display.value = currentInput;
    }

    // Menangani klik tombol angka
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const number = button.dataset.number;
            if (waitingForSecondOperand) {
                currentInput = number;
                waitingForSecondOperand = false;
            } else {
                currentInput = currentInput === '0' ? number : currentInput + number;
            }
            updateDisplay();
        });
    });

    // Menangani klik tombol desimal
    decimalButton.addEventListener('click', () => {
        if (waitingForSecondOperand) {
            currentInput = '0.';
            waitingForSecondOperand = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    });

    // Menangani klik tombol operator
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextOperator = button.dataset.operator;
            const inputValue = parseFloat(currentInput);

            if (operator && waitingForSecondOperand) {
                operator = nextOperator;
                return;
            }

            if (firstOperand === null) {
                firstOperand = inputValue;
            } else if (operator) {
                const result = operate(operator, firstOperand, inputValue);
                currentInput = String(result);
                firstOperand = result;
            }

            waitingForSecondOperand = true;
            operator = nextOperator;
            updateDisplay();
        });
    });

    // Menangani klik tombol clear
    clearButton.addEventListener('click', () => {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    });

    // Menangani klik tombol sama dengan (=)
    equalsButton.addEventListener('click', () => {
        if (firstOperand === null || operator === null) {
            return; // Tidak ada perhitungan yang perlu dilakukan
        }

        const secondOperand = parseFloat(currentInput);
        const result = operate(operator, firstOperand, secondOperand);

        currentInput = String(result);
        firstOperand = null; // Reset untuk perhitungan baru
        operator = null;
        waitingForSecondOperand = true; // Siap untuk input angka baru setelah hasil
        updateDisplay();
    });

    // Fungsi untuk melakukan operasi matematika
    function operate(operator, num1, num2) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 === 0) {
                    alert("Tidak bisa membagi dengan nol!");
                    return 0; // Atau tangani error lebih baik
                }
                return num1 / num2;
            default:
                return num2;
        }
    }

    // Inisialisasi tampilan saat pertama kali dimuat
    updateDisplay();
});