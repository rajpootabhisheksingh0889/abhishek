import { useEffect } from 'react';

const usePayPalScript = (clientId) => {
    useEffect(() => {
        // Check if the PayPal script is already loaded
        const existingScript = document.getElementById('paypal-script');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.id = 'paypal-script';
            script.async = true;
            document.body.appendChild(script);
        }
    }, [clientId]);
};

export default usePayPalScript;
