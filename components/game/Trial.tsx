import React from 'react'
//import Card from './Card'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card'

const Trial = () => {
    return (
        <>
            <Card>
                <CardHeader>This is a card</CardHeader>
                <CardContent>Hello</CardContent>
                <CardDescription>My Card</CardDescription>
                <CardFooter></CardFooter>
            </Card>

        </>

    )
}

export default Trial