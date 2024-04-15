"use strict";
window.fineList = {
    searchFines : searchFines
}

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

function searchFines(searchKey){
    return DB.filter((item) => /\d{3}/.test(searchKey)? item.номер === searchKey: item.тип === searchKey);
   
}

