import React from 'react'
import './index.css'

export default function ViewAssessment({ assessmentResult }) {
    return (
        <div className="view-assessment-container">
            <div className="table-header">Assessment Data</div>
            <table className="va-table">
                <tr className='va-row'>
                    {/* <thead className='va-header'> */}
                    <th className='va-index'>
                        Sr.
                    </th>
                    <th className='va-question'>
                        Questions
                    </th>
                    <th className='va-description'>
                        Answer
                    </th>
                    {/* </thead> */}
                </tr>
                {(assessmentResult.attemptedQuestions || []).map((attemptedQuestion, index) => {
                    return (
                        <tr className="va-row" key={`attempted-question-${index}`}>
                            <td className="va-index" >{index + 1}</td>
                            <td className="va-question">{attemptedQuestion.question}</td>
                            <td className="va-description">{attemptedQuestion.answer ? 'YES' : 'NO'}</td>
                        </tr>
                    )
                })
                }
            </table>
        </div>
    )
}