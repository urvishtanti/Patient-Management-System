import classNames from 'classnames';
import React from 'react';
import { RequestState } from '../../lib/types';
import { BooleanRadioGroupComponent } from '../boolean-radio-group/boolean-radio-group';
import { ErrorMessage } from '../elements/error-message';
import { PrepareMessage } from '../elements/prepare-message';
import { SucessMessage } from '../elements/success-message';
import './assessment-form.css';

export default function AssessmentForm({ questions, onAttempt, onSubmit, questionSubmitState, errorMessage }) {

    const QuestionList = ({ questions }) => {
        return questions.map((questionRecord, index) => {
            return (
                <div key={questionRecord.questionId} className={classNames(`${index % 2 === 1 ? 'odd' : ''}`, "question-container")}>
                    <div className='question-count'>Question {index + 1} of 9</div>
                    <div className='assessment-question'>{questionRecord.question}</div>
                    <div className='radio-group'>
                        <BooleanRadioGroupComponent onChange={(value) => {
                            onAttempt(questionRecord.questionId, value);
                        }} />
                    </div>
                </div>
            )
        })
    }
    return <div className='aform-container'>
        <h2 className='assessment-form-heading'>Assessment Form</h2>
        <QuestionList questions={questions} />
        {
            questionSubmitState === RequestState.COMPLETED && <SucessMessage>Your assessment submitted successfully!</SucessMessage>
        }
        {
            questionSubmitState === RequestState.FETCHING && <PrepareMessage>Please, wait while we submit your assessment!</PrepareMessage>
        }
        {
            questionSubmitState === RequestState.ERROR && <ErrorMessage>{errorMessage}</ErrorMessage>
        }
        <br />
        <div className='submit-button-container'>
            <button type="primary" onClick={(e) => {
                e.preventDefault();
                onSubmit(e);
            }}>Submit</button>
        </div>
    </div>
}
