import { useDummyList } from '@/src/api/demo'
const Home = () => {
    const { data } = useDummyList()
    return (
        <>
            <h1>Hello World</h1>
            <ul>
                {data?.map(({ id, title }) => (
                    <li key={id}>{title}</li>
                ))}
            </ul>
        </>
    )
}

export default Home
