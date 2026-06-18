const currencyFormat = new Intl.NumberFormat(undefined, {
    style: 'currency', currency: 'ILS',
    currencyDisplay: 'narrowSymbol'
});

function CurrencyFormat(number) {
    return currencyFormat.format(number);
}

export default CurrencyFormat;