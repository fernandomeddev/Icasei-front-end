import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse): any {
    const { query } = req;

    const options = {
        method: 'GET',
        url: `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${query.data}&key=${process.env.REACT_APP_API_KEY}`
    };

    return axios.request(options).then(response => {
        res.status(200).json(response.data)
    }).catch(error => {
        console.error(error)
    })
}