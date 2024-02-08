import React from 'react';
import './card-content.css';
import Step4Image from "./images/counselor.jpg";
import Step2Image from "./images/create-account.jpg";
import Step5Image from "./images/doctor.png";
import Step1Image from "./images/mental-health.jpg";
import Step3Image from "./images/patient-checklist.jpg";


export default function CardImageComponent() {
    return (
        <div className="image-row">
            <h2>How it works?</h2>
            <div className='image-container'>
                <div className="col-3">
                    <img src={Step1Image} className="intro-img" alt='Mental Health' width={100} />
                    <h4>Step 1: Mental Health Issues</h4>
                </div>
                <div className="col-3">
                    <img src={Step2Image} className="intro-img" alt='Mental Health' width={100} />
                    <h4>Step 2: Create Account</h4>
                </div>
                <div className="col-3">
                    <img src={Step3Image} className="intro-img" alt='Self Assessment Test' />
                    <h4>Step 3: Take Self Assessment Test</h4>
                </div>
                <div className="col-3">
                    <img src={Step4Image} className="intro-img" alt='Counselor Patient' />
                    <h4>Step 4: Meeting Counselor</h4>
                </div>
                <div className="col-3">
                    <img src={Step5Image} className="intro-img" alt='Doctor Patient' />
                    <h4>Step 5: Meeting psychiatrist</h4>
                </div>
            </div>
        </div>
    )
}