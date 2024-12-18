import React from 'react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const MaxWidthWrapper = ({
    className,
    children
}: {
    className?:string
    children:ReactNode
}) => {
    return (
        <div className= {cn('mx-auto w-full max-w-screen-xl px-4 py-2 md:px-8 ',className)}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
