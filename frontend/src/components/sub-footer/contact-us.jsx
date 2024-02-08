import React from 'react'
import './sub-footer.css'

export function SubFooterContactUsComponent({
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    onSubmit
}) {
    return (
        <div className='form-container'>
            <h5 className="text"><strong>Send us a Message</strong></h5>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control" id="Name" placeholder="Your Name" value={name}
                        required={true}
                        onChange={(e) => {
                            setName(e.target.value);
                        }} />
                </div>
                <br />
                <div className="form-group">
                    <input type="email" className="form-control" id="Email" placeholder="Your Email" value={email}
                        required={true}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <br />
                <div className="form-group">
                    <textarea className="form-control" id="query" rows="3" placeholder="Post Your Query..." value={message}
                        required={true}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    ></textarea>
                </div>
                <br />
                <input type="submit" className="btn btn-primary contact-us-submit-button" onClick={onSubmit} />
            </form>
        </div>
    )
}