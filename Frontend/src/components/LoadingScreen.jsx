import React, { useEffect, useState } from 'react'
import './loading-screen.scss'

const DEFAULT_MESSAGES = [ "Loading..." ]

/**
 * @param {string[]} messages - optional list of messages to cycle through (great for long waits, like report generation)
 * @param {number} interval - ms between message changes
 */
const LoadingScreen = ({ messages = DEFAULT_MESSAGES, interval = 2200 }) => {
    const [ index, setIndex ] = useState(0)

    useEffect(() => {
        if (messages.length <= 1) return
        const timer = setInterval(() => {
            setIndex(i => (i + 1) % messages.length)
        }, interval)
        return () => clearInterval(timer)
    }, [ messages, interval ])

    return (
        <main className='loading-screen'>
            <div className='loading-screen__spinner'>
                <div className='loading-screen__ring loading-screen__ring--outer' />
                <div className='loading-screen__ring loading-screen__ring--inner' />
            </div>
            <h1 key={index} className='loading-screen__message'>{messages[ index ]}</h1>
        </main>
    )
}

export default LoadingScreen