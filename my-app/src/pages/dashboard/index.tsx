import { canSSRAuth } from './../../utils/canSSRAuth';

export default function Dashboard(){
    return (
        <div>
            <h1>Welcome!!!!</h1>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props:{}
    }
})