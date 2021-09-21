jQuery(document).ready( function() {
    if (jQuery('#nn_instalment_cycle').length > 0) {
        jQuery('#nn_instalment_cycle').on('change',function() {             
            var cycleInformation = '';              
            for (instalmentCycle = 1; instalmentCycle <= jQuery(this).val(); instalmentCycle++) {
                if(instalmentCycle != jQuery(this).val())
                {
                    cycleInformation += '<tr><td>' + instalmentCycle + '</td><td>'+ jQuery(this).find(':selected').attr('data-amount') +'</td></tr>';
                } else {
                    var lastCycleAmount = (jQuery('#nn_order_amount').val() - (jQuery(this).find(':selected').attr('data-cycle-amount') * (jQuery(this).val() - 1)));
                    
                    cycleInformation += '<tr><td>' + instalmentCycle + '</td><td>'+ jQuery('#nn_order_currency').val() + ' ' + formatMoney(lastCycleAmount) +'</td></tr>';
                }
            }                           
            jQuery('#nn_instalment_cycle_information').html(cycleInformation);
        }).change();
    }
            
    jQuery('#novalnet_form').on('submit',function(){
      jQuery('#novalnet_form_btn').attr('disabled',true);      
    });
  
});

// Formatting the amount

function formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "jQuery1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}
