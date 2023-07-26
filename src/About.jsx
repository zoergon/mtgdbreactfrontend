import './App.css'
import React, { useEffect } from 'react'

// About-sivu legal disclaimereilla
//
// Avautuu App.js:n navigointi palkin kautta linkistä

const About = ({ loggedInLoginId, newLoginId, accesslevelId, setShowWelcome }) => {

    useEffect(() => {
        setShowWelcome(false)
        })

    return (    
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <h2>
                    About me and this project:
                </h2>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ width: '40%' }}>
                    <br/>
                    I am a software developer student from Careeria, Finland.
                    <br/>
                    This project started as a my personal school project spring 2023. My goal is to make this actually useful tool.
                    <br/>
                    So long this stays on it's alpha version, it's use is restricted mostly for test purposes.
                    <br/><br/>
                    And to serve as a portfolio of my coding. For my job applications.
                    <br/><br/><br/>
                </p>
            </div>
            <div>
                <h1>
                    Legal disclaimers:
                </h1>
            </div>
            <div>
                <h3 style={{ paddingTop: '1rem' }}>
                    Wizards of the Coast
                </h3>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ width: '40%' }}>
                <br/>
                Parts of these page contents are unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy.
                The literal and graphical information presented on this site about Magic: The Gathering, including card images and mana symbols, is copyright Wizards of the Coast, LLC.
                <br/><br/>
                MtG:db is not produced by or endorsed by Wizards of the Coast.
                <br/><br/><br/>
                </p>
            </div>
            <div>
                <h3>
                    Scryfall, LLC
                </h3>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <br/>
                <p style={{ width: '40%' }}>
                Bulk data for my database is from:<br/> https://scryfall.com/docs/api/bulk-data.
                <br/><br/>
                Scryfall, LLC owns copyrights to their own data contents.
                <br/><br/>
                From: <br/>
                https://scryfall.com/docs/api
                <br/><br/>
                "Use of Scryfall Data and Images
                <br/>
                As part of the Wizards of the Coast Fan Content Policy, 
                Scryfall provides our card data and image database free of charge for the primary purpose of creating additional Magic software, 
                performing research, or creating community content (such as videos, streams, podcasts, etc.) about Magic and related products."
                <br/><br/>
                MtG:db is not produced by or endorsed by Scryfall, LLC.
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </p>
            </div>
        </div>   
        
    )
}
    
    export default About