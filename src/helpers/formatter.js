export const formatPhone = (phone) => {
    if (!phone) return 'номер телефона';
    const telNumber = phone.replace(/\D/g, '');
    return `+7 ${telNumber.substring(1, 4)} ${telNumber.substring(4, 7)}-${telNumber.substring(7, 9)}-${telNumber.substring(9)}`;
}
export const formatDate = (date) => {
    if (!date) return 'дата';
    return new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
export const formatExpiredTime = date => {
    if (!date) return date;

    const now = new Date();

    const expired = (now.getTime() - new Date(date).getTime()) / (1000 * 60);

    if (expired < 1) return 'менее минуты назад';
    if (expired < 60) return `~ ${Math.round(expired)} ${declensionNumerals(expired, ['минута', 'минуты', 'минут'])} назад`;
    if (expired / 60 < 24) return `~ ${Math.round(expired / 60)} ${declensionNumerals(expired, ['час', 'часа', 'часов'])} назад`;
    return formatDate(date);
}
export const formatPrice = (amount) => {
    return Number(amount).toFixed(2);
}
export const declensionNumerals = (value, words) => {  // 1, 2, 5
	value = Math.abs(value) % 100; 
	const num = value % 10;
	if(value > 10 && value < 20) return words[2]; 
	if(num > 1 && num < 5) return words[1];
	if(num == 1) return words[0]; 
	return words[2];
}