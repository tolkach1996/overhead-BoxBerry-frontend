import httpClient from "./client";

class OrderService {
    static async getOrderById(payload) {
        return httpClient.get('ms/orders/' + payload);
    }
    static async updateStatusById(payload) {
        return httpClient.patch('ms/orders/' + payload);
    }
}

export default OrderService;