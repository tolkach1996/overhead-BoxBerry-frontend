export const formatPhone = (phone) => {
    if (!phone) return 'номер телефона';
    const telNumber = phone.replace(/\D/g, '');
    return `+7 ${telNumber.substring(1, 4)} ${telNumber.substring(4, 7)}-${telNumber.substring(7, 9)}-${telNumber.substring(9)}`;
}
export const formatDate = (date) => {
    if (!date) return 'дата';
    return new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
export const formatPrice = (amount) => {
    return Number(amount).toFixed(2);
}