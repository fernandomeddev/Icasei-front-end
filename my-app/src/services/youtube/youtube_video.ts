import axios from "axios";

const KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const youtubeVideoById = axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3',
    params:{ part: 'snippet,statistics',key:'AIzaSyCjlXQb-BF9C1T1RRQzitWBS_2ocflAOKk'},
})

export default youtubeVideoById;