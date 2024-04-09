"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;


/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click',payFine);
function payFine(){
    let fineNumValue = fineNumber.value;
    let passportValue = passport.value;
    let creditCardNumberValue = creditCardNumber.value;
    let cvvValue = cvv.value;
    let amountValue = parseFloat(amount.value);

    let fineToPay = DB.find(fine => fine.номер === fineNumValue && fine.сума === amountValue);

    if (!fineToPay) {
        alert("Номер штрафу або сума не співпадають");
        return;
    }

    if (!validatePassport(passportValue)) {
        alert("Не вірний паспортний номер");
        return;
    }

    if (!validateCreditCard(creditCardNumberValue)) {
        alert("Не вірна кредитна картка");
        return;
    }

    if (!validateCVV(cvvValue)) {
        alert("Не вірний cvv");
        return;
    }

    DB = DB.filter(fine => fine.номер !== fineToPay.номер);
    alert("Оплата пройшла успішно");
}

function validatePassport(passportValue) {
    let passportRegex = /^[А-ЩЬЮЯҐЄІЇ]{2}\d{6}$/;
    return passportRegex.test(passportValue);
}

function validateCreditCard(creditCardNumberValue) {
    let creditCardRegex = /^\d{16}$/;
    return creditCardRegex.test(creditCardNumberValue);
}

function validateCVV(cvvValue) {
    let cvvRegex = /^\d{3}$/;
    return cvvRegex.test(cvvValue);
}