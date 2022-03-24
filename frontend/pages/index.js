import Head from 'next/head'
import ArticleList from '../components/ArticleList'
import { AddressProvider } from '../contexts/AddressContext'

export default function Home({articles}) {
  return (
    <div>
        <Head>
          <title>MetaLens</title>
          <meta name = 'keywords' content = 'Safe Space for Content Creators and Admirers Alike' />
        </Head>
        {/* <ArticleList articles={articles}/> */}
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`);
  const articles = await res.json();

  return {
    props: {
      articles
    }
  }
}
