import axios from "axios";

const KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const apiyoutube = axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3',
    params:{ part: 'snippet' , maxResults: 10, key:KEY},
})

export default apiyoutube;
