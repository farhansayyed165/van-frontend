import { BaseUrl } from "./constants"
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000'
});