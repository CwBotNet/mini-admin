"use client"
import React from 'react'
import { Button } from '../button'
import axios from 'axios'
import { BACKEND_URL } from '@/config'
import { useRouter } from 'next/navigation'

const DeleteBtn = ({ id }: { id: string }) => {
    const router = useRouter()
    async function logout() {
        await axios.delete(`${BACKEND_URL}/admin/miniadmin/${id}`, {
            withCredentials: true
        })

        return router.refresh()
    }
    return (
        <Button variant={'ghost'} className='w-full hover:bg-red-500 hover:text-white' onClick={logout}>
            Delete
        </Button>
    )
}

export default DeleteBtn
