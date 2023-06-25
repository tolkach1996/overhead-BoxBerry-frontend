// все запросы к API и не только

import axios from "axios"

export const testzapros = async () => {
    const response = await axios.get('url');
    const { status, data } = response // узнать как называется эта хуйня { status, data }
    return data
}