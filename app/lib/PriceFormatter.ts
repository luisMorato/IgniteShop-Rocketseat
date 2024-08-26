export const priceFormatter = (price: number) => {
    const currencyFormatedPrice = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
    }).format(price);

    return currencyFormatedPrice;
}