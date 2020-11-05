import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function RecipeCard({ content }) {
    return (
        <div className="flex justify-around flex-wrap">
            { content.map((recipe) => (
                <Link href={`/recipes/${encodeURIComponent(recipe.slug)}`}>
                    <div key={ recipe.id } class="flex justify-center items-center flex-col border border-2 border-gray-200 p-4 rounded-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                        <Image className="rounded-md" 
                            src={ recipe.photo.url }
                            alt={recipe.title}
                            width={300}
                            height={200} />
                        <h2 className="w-56 text-center font-bold">{ recipe.title }</h2>
                    </div>
                </Link>
            ))}
        </div>
    )
}
