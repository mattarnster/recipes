import Head from 'next/head'
import { GraphQLClient } from 'graphql-request'
import RecipeCards from '../components/RecipeCards'

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps() {
  const { recipes } = await graphcms.request(
    `
    query HomepageContent() {
      recipes(first: 3) {
        id,
        slug,
        title,
        photo {
          url
        }
      }
    }
    `
  )
  return {
    props: {
      recipes
    },
    revalidate: 60,
  }
}


export default function Home({ recipes }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Arnold Recipes | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-sm mx-auto mt-4">
        <a href="/" className="hover:text-orange-600 transition-all duration-200  permanent-marker text-4xl text-center text-orange-500 block">Recipes from the<br/> Arnold kitchen</a>

        <div className="mt-10 px-4 py-2">
          <RecipeCards content={ recipes } />
        </div>
      </div>
    </div>
  )
}
