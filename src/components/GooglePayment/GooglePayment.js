import GooglePayButton from "@google-pay/button-react"
const GooglePayment = props => {
    return (
        <GooglePayButton
            environment="TEST"
            buttonColor="white"
            buttonSizeMode="fill"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                        },
                    },
                ],
                merchantInfo: {
                    merchantId: process.env.REACT_APP_MERCHANT_ID,
                    merchantName: 'Burger-Builder',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: props.price,
                    currencyCode: 'USD',
                    countryCode: 'US',
                },
            }}
            onLoadPaymentData={props.paidHandler}
            onCancel={props.paymentCancelHandler}
            onError={props.paymentErrorHandler}

            
        />
    )
}

export default GooglePayment