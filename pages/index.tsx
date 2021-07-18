import { useDummyList } from '@/src/api/demo'
import useTranslation from 'next-translate/useTranslation'

const Home = () => {
    const { t } = useTranslation()
    const { data } = useDummyList()
    return (
        <>
            <h1>{t('common:title')}</h1>
            <ul>
                {data?.map(({ id, title }) => (
                    <li key={id}>{title}</li>
                ))}
            </ul>
        </>
    )
}

export default Home
