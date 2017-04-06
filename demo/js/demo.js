const ibanDemo = function() {

  function couldBeIBAN(str) {

      return str && countries.isValidISOCode(str.substring(0,2));
  }

  return {
    couldBeIBAN: couldBeIBAN,
    couldBeBBAN: function couldBeBBAN(str) {

        return str && !couldBeIBAN(str);
    }

  }
}();

$(document).ready(function(){

  function onIBAN(str) {
      let html;
      if (IBAN.isValid(str)) {
        const bban = IBAN.toBBAN(str, ' ');
        html = '<h3>This IBAN is VALID! <small>BBAN is ' + bban + '</small></h3>';
      } else {
        html = '<h3>This IBAN is INVALID!';
      }
      $('#results').html(html);
      $('#results').show();
  }

  function onBBAN(str) {
      let html;
      const country = $('#country').val();
      if (IBAN.isValidBBAN(country, str)) {
        const iban = IBAN.fromBBAN(country, str);
        html = '<h3>This BBAN is VALID! <small>IBAN is ' + iban + '</small></h3>';
      } else {
        html = '<h3>This BBAN is INVALID!';
      }
      $('#results').html(html);
      $('#results').show();
  }

  $('#userInput').bind('keyup', onChange);
  $('#userInput').bind('change', onChange);

  $('#results').hide();
  $('#country').hide();
  $('#countryLb').hide();
  $('#userInput').focus();

  function onChange() {
    const val = $('#userInput').val();
    if (ibanDemo.couldBeIBAN(val)) {
      $('#country').hide();
      $('#countryLb').hide();
    }

    if (ibanDemo.couldBeBBAN(val)) {
      $('#country').show();
      $('#countryLb').show();
    }
  }

  $('#goBtn').click(function() {
      $('#results').hide();

      const val = $('#userInput').val();
      if (ibanDemo.couldBeIBAN(val)) {
        onIBAN(val);
      }

      if (ibanDemo.couldBeBBAN(val)) {
        onBBAN(val);
      }


  });
});
