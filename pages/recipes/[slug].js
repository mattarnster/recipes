import React from 'react'
import Head from 'next/head'
import { GraphQLClient } from 'graphql-request'
import ReactMarkdown from 'react-markdown'

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticPaths() {
    const { recipes } = await graphcms.request(
        `
        query HomepageContent() {
          recipes() {
            id,
            slug,
            title,
            description,
            ingredients,
            method,
            photo {
              url
            }
          }
        }
        `
    )
    const paths = recipes.map((recipe) => ({
        params: { slug: recipe.slug }
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const recipes = await graphcms.request(
        `
        query RecipeSingle() {
          recipes(where: { slug: "${params.slug}" }) {
            id,
            slug,
            title,
            description,
            ingredients,
            method,
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

export default function Recipe({ recipes }) {
    const recipe = recipes.recipes[0]

    return (
        <div className="container mx-auto">
      <Head>
        <title>{recipe.title} | Arnold Kitchen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-sm mx-auto mt-4">
        <a href="/" className="hover:text-orange-600 transition-all duration-200  permanent-marker text-4xl text-center text-orange-500 block">Recipes from the<br/> Arnold kitchen</a>

        <div className="mt-10 px-4 py-2">
            <h1 className="text-4xl text-center font-bold mb-2 mt-2 text-white px-2 py-2 bg-black tracking-wider">{ recipe.title }</h1>
            <img className="object-cover rounded-md shadow-lg" src={recipe.photo.url} />            

            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-4 mt-4">
                <div className="method">
                    <ReactMarkdown children={ recipe.method }/>
                </div>
                <div className="ingredients bg-black text-white px-4 py-4 mb-6 lg:mb-0">
                    <h1 className="tracking-wide text-center text-xl mb-4">INGREDIENTS</h1>
                    <ReactMarkdown children={ recipe.ingredients }/>
                </div>
            </div>
        </div>
      </div>
    </div>
    )
}
