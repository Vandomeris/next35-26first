"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "./prisma"
import { writeFile } from "node:fs/promises"
import { join } from "node:path"

export async function createUser(formData) {


    const files = formData.getAll('image')

    const imagesNames = []

    const allowedType = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']

    console.log(files)
    for (const img of files) {

        if (img.size > 1_000_000) {
            break;
        }

        if (!allowedType.includes(img.type)) {
            console.log('Ошибка')
            break;
        }

        const buffer = Buffer.from(await img.arrayBuffer())

        const imageName = Date.now() + img.name.replaceAll(' ', '_')

        await writeFile(
            join('public', 'photos', imageName),
            buffer
        )

        imagesNames.push({ url: `/photos/${imageName}` })
    }



    const user = await prisma.user.create({
        data: {
            age: Number(formData.get('age')),
            email: formData.get('email'),
            password: formData.get('password'),
            username: formData.get('username'),
            photos: {
                createMany: {
                    data: imagesNames
                }
            }
        }
    })

    revalidatePath('/users')

}

export async function deleteUser(id) {
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/users')
}

export async function updateUser(user) {

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            age: user.age,
            email: user.email,
            password: user.password,
            username: user.username
        }
    })

    revalidatePath('/users')

}