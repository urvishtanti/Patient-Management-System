import React from 'react'
import "./card-content.css"

export default function CardContentComponent() {
    return (
        <div className='what-we-do'>
            <h2>Why Lifeline?</h2>
            <div className='container'>
                <div className='col-4'>
                    <p className='side-heading'><i className='fas'></i>Have productive, healthy relationships</p>
                    <p>Keep yourself healthy by taking timely vaccines, our reminders will keep you in check. You can rely on us to be safe. We are here to help you stay safe.</p>
                </div>
                <div className='col-4'>
                    <p className='side-heading'><i className='fas'></i>Cope with daily stress in life</p>
                    <p>Discussing your issues elobratevely by scheduling frequent appointments of our well-known psychriatist.</p>
                </div>
                <div className='col-4'>
                    <p className='side-heading'><i className='fas'></i>Establish a positive sense of self</p>
                    <p>Taking small steps towards success by acheiving small small tasks</p>
                </div>
            </div>
        </div>
    )
}