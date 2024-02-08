import { SOMETHING_WENT_WRONG } from "../../lib/messages";
import request from "../../lib/request";
import {
  ONLOAD_PATIENT_ASSESSMENT_PAGE,
  ONLOAD_PATIENT_STATUS_PAGE,
  PATIENT_ASSESSMENT_QUESTIONS_ERROR, PATIENT_ASSESSMENT_QUESTIONS_SUCCESS, PATIENT_ASSESSMENT_SUBMIT_ERROR, PATIENT_ASSESSMENT_SUBMIT_FETCHING, PATIENT_ASSESSMENT_SUBMIT_SUCCESS, PATIENT_RECORD_STATUS_ERROR, PATIENT_RECORD_STATUS_FETCHING, PATIENT_RECORD_STATUS_SUCCESS
} from "../types";
import { openErrorMessageModal } from "./gui";

const ASSETMENT_ID = "635b203cf4d8b811f7a0ac0b";
export const getAssessmentQuestions = () => async (dispatch) => {
  const url = `patient/assessment/${ASSETMENT_ID}`;
  request(url, "GET")
    .then((resp) => {
      if (resp && resp.data) {
        if (resp.data.questions && resp.data.questions.length) {
          dispatch({
            type: PATIENT_ASSESSMENT_QUESTIONS_SUCCESS,
            questions: resp.data.questions,
          });
          return;
        }
      }
      dispatch({
        type: PATIENT_ASSESSMENT_QUESTIONS_ERROR,
        errorMessage: SOMETHING_WENT_WRONG,
      });
    })
    .catch((exception) => {
      // handle error.
      dispatch(openErrorMessageModal(exception.data.errorMessage));
      dispatch({
        type: PATIENT_ASSESSMENT_QUESTIONS_ERROR,
        errorMessage: SOMETHING_WENT_WRONG,
      });
    });
};

export const submitAssessmentQuestions =
  (attemptedQuestions) => async (dispatch) => {
    const url = `patient/assessment/${ASSETMENT_ID}`;
    if (!attemptedQuestions || !attemptedQuestions.length) {
      dispatch({
        type: PATIENT_ASSESSMENT_SUBMIT_ERROR,
        errorMessage: "You have not attempted any questions!"
      });
      return;
    }
    dispatch({
      type: PATIENT_ASSESSMENT_SUBMIT_FETCHING,
    });
    request(url, "POST", null, {
      questions: attemptedQuestions,
    })
      .then((resp) => {
        if (resp) {
          dispatch({
            type: PATIENT_ASSESSMENT_SUBMIT_SUCCESS,
          });
        } else {
          dispatch({
            type: PATIENT_ASSESSMENT_SUBMIT_ERROR,
            errorMessage: SOMETHING_WENT_WRONG,
          });
        }
      })
      .catch((exception) => {
        // handle error.
        dispatch(openErrorMessageModal(exception.data.errorMessage));
        dispatch({
          type: PATIENT_ASSESSMENT_SUBMIT_ERROR,
          errorMessage: exception.data.errorMessage,
        });
      });
  };

export const fetchPatientRecordStatus = () => async (dispatch) => {
  const url = `patient/status`;
  dispatch({
    type: PATIENT_RECORD_STATUS_FETCHING,
  });
  request(url, "GET", null)
    .then((resp) => {
      if (resp) {
        dispatch({
          type: PATIENT_RECORD_STATUS_SUCCESS,
          payload: resp.data,
        });
      } else {
        dispatch({
          type: PATIENT_RECORD_STATUS_ERROR,
          errorMessage: SOMETHING_WENT_WRONG,
        });
      }
    })
    .catch((exception) => {
      // handle error.
      dispatch(openErrorMessageModal(exception.data.errorMessage));
      dispatch({
        type: PATIENT_RECORD_STATUS_ERROR,
        errorMessage: exception.data.errorMessage
      });
    });
};

export const onLoadPatientAssessmentPage = () => (dispatch) => {
  dispatch({
    type: ONLOAD_PATIENT_ASSESSMENT_PAGE
  })
}

export const onLoadPatientStatusPage = () => (dispatch) => {
  dispatch({
    type: ONLOAD_PATIENT_STATUS_PAGE
  })
}
