"use client"
import React from 'react'
import { Button } from '../button'
import axios from 'axios'
import { BACKEND_URL } from '@/config'

const DeleteBtn = ({ id }: { id: string }) => {
    return (
        <Button variant={'ghost'} className='w-full hover:bg-red-500 hover:text-white' onClick={() => {
            axios.delete(`${BACKEND_URL}/admin/miniadmin/${id}`, {
                withCredentials: true
            }).then(() => {
                window.location.reload()
            })
        }}>
            Delete
        </Button>
    )
}

export default DeleteBtn
