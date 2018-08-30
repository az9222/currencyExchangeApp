//have a function, conversionService, with two different country codes as parameter
//the first parameter is conversion from, second is conversion to

$(document).ready(function(){
    let currencyMapping = { //https://www.xe.com/symbols.php
        "USD": 36,
        "AUD": 36,
        "BGN": 1083,
        "BRL": 82,
        "CAD": 36,
        "CNY": 165,
        "HRK": 107,
        "CZK": 75,
        "DKK": 107,
        "EUR": 8364,
        "GBP": 163,
        "HKD": 36,
        "HUF": 70,
        "ISK": 107,
        "IDR": 82,
        "ILS": 8362,
        "INR": 8377,
        "JPY": 165,
        "KRW": 8361,
        "ZAR": 82,
        "MXN": 36,
        "MYR": 82,
        "NZD": 36,
        "NOK": 107,
        "PHP": 8369,
        "PLN": 122,
        "RON": 108,
        "RUB": 8381,
        "SGD": 36,
        "SEK": 107,
        "CHF": 67,
        "THB": 3647,
        "TRY": 8378,
    }

    function receiveConversionData (convertFrom, convertTo, amount) {
        $.ajax({
            url: "https://api.exchangeratesapi.io/latest?base="+convertFrom,
            method: "GET" ,
            //we always want what we want back is as a JSON. 
            contentType: 'application/JSON',
            success: function(data){
                let conversionRate = data.rates[convertTo];
                let convertedAmt = (conversionRate*amount).toFixed(2)
                 $("#amount").append(convertedAmt)
            }
        })
    }
    // receiveConversionData("USD", "GBP");

    $("#convert-btn").click(function(){
        $("#amount").text('');
        let countryNameConvertFrom = $('#start-country option:selected').attr('value');
        let conversionInput = Number.parseFloat($("#amount-convert-from").val());
        let countryNameConvertTo = $('#end-country option:selected').attr('value');
        if (countryNameConvertFrom === countryNameConvertTo) {
            $("#amount").append(conversionInput);
            alert("Change country!")
        } else if (!conversionInput) {
            alert("Enter an amount!");
            let conversionInput = $("#amount-convert-from").val('');
            $("#amount").text('');
        } else {
            let endCode = currencyMapping[countryNameConvertTo].toString();
            receiveConversionData(countryNameConvertFrom, countryNameConvertTo, conversionInput);
            $("#amount").html(`&#${endCode};`)
        }
    })

    $("#start-country").change(function() {
        let countryValue = $("#start-country option:selected").val()
        let code = currencyMapping[countryValue].toString()
        $("#country-code").html(`&#${code};`);
    })

    $("#clear").click(function(){
        let conversionInput = $("#amount-convert-from").val('');
        $("#amount").text('');
        $("#start-country").val("")
        $("#end-country").val("")
    })

    $("#switch-btn").click(function(){
        let countryNameConvertFrom = $('#start-country option:selected').attr('value');
        let countryNameConvertTo = $('#end-country option:selected').attr('value');
        $("#start-country").val(countryNameConvertTo)
        $("#end-country").val(countryNameConvertFrom)
    })

    $("#change-title").click(function(){
        $("#title").text("Welcome");
    })

})
