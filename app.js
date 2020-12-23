(async () => {
  let RATES_URL = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`;

  let rates = [];
  const re = /[A-Z]{2,3}\s\d{2,4}/g;
  const reRateName = /[A-Z]{2,3}/;
  const reRatePrice = /\d{2,4}/;

  await fetch(RATES_URL)
    .then((data) => data.json())
    .then((data) => {
      rates = data;
    });

  let res = document.body.innerHTML.replace(re, function (item) {
    let updatePrice = "";
    for (rate of rates) {
      if (item.match(reRateName) == rate.cc) {
        updatePrice = Math.round(+item.match(reRatePrice) * rate.rate) + " UAH";
        item = item.replace(item, updatePrice);
        return item;
      }
    }
  });
  document.body.innerHTML = res;
})();
