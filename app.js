//have a function, conversionService, with two different country codes as parameter
//the first parameter is conversion from, second is conversion to

$(document).ready(function(){
    function receiveConversionData (convertFrom, convertTo) {
        $.ajax({
            url: "https://api.exchangeratesapi.io/latest?base="+convertFrom,
            method: "GET" ,
            //we always want what we want back is as a JSON. 
            contentType: 'application/JSON',
            success: function(data){
                let conversionRate = data.rates[convertTo];
                 $(".conversion-container").append("conversionRate")
            }
        })
    }
    // receiveConversionData("USD", "GBP");

$(".btn").click(function(){
    let countryNameConvertFrom = $('#start-country option:selected').attr('value');
    let conversionInput = Number.parseInt($("#amount-convert-from").val());
    let countryNameConvertTo = $('#end-country option:selected').attr('value');
    let conversionAmount = receiveConversionData(countryNameConvertFrom, countryNameConvertTo) * conversionInput;
    alert(conversionAmount);
})

})
