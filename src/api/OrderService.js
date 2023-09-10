import httpClient from "./client";

class OrderService {
    static async getOrderByDocumentId(payload) {
        return await httpClient.get('orders/' + payload);
    }
    static async updateStatusById(id, payload) {
        return await httpClient.patch('orders/' + id, payload);
    }
    static async getOrdersMove(payload) {
        return await httpClient.get('orders/move', {
            params: payload
        });
    }
}

export default OrderService;