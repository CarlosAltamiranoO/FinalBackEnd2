export function generateUniqueTicketCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < 20; i++) {  
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
export function calculateTotalPrice(products){
    let totalPrice = 0
    for(const item of products){
        totalPrice += (item.quantity * item.price)
    }
    return totalPrice
}
