//have a function, conversionService, with two different country codes as parameter
//the first parameter is conversion from, second is conversion to

$(document).ready(function(){
    function receiveConversionData (convertFrom, convertTo, amount) {
        $.ajax({
            url: "https://api.exchangeratesapi.io/latest?base="+convertFrom,
            method: "GET" ,
            //we always want what we want back is as a JSON. 
            contentType: 'application/JSON',
            success: function(data){
                let conversionRate = data.rates[convertTo];
                let convertedAmt = (conversionRate*amount).toFixed(2)
                 $("#amount").append("$"+(convertedAmt))
            }
        })
    }
    // receiveConversionData("USD", "GBP");

    $(".btn").click(function(){
        $("#amount").text('');
        let countryNameConvertFrom = $('#start-country option:selected').attr('value');
        let conversionInput = Number.parseFloat($("#amount-convert-from").val());
        let countryNameConvertTo = $('#end-country option:selected').attr('value');
        if (countryNameConvertFrom === countryNameConvertTo) {
            $("#amount").append("$"+conversionInput);
            alert("Change country!")
        } else {
        receiveConversionData(countryNameConvertFrom, countryNameConvertTo, conversionInput);
        }
    })

})
