const paymentMethodsMap = [
    {key: 'crypto-wallet', value: 'Crypto Wallet', selected: false},
    {key: 'credit-card', value: 'Credit Card', selected: false},
    {key: 'debit-card', value: 'Debit Card', selected: false},
    {key: 'paypal', value: 'PayPal', selected: false},
]


exports.payMethods = (currentCrypto) => {

    console.log(currentCrypto)
    const paymentMethods = paymentMethodsMap.map((el) => (el.key == currentCrypto.payment) ? {...el, selected: true} : el );
 
    return paymentMethods
}