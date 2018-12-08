import { User } from '../interfaces/user';
import { ADD_USER, LOAD_USERS, LOAD_USER_COUNT, DELETE_USER } from '../actions/user';
import { Patient } from '../interfaces/patient';
import { LOAD_PATIENT_COUNT, LOAD_PATIENTS, DELETE_PATIENT, ADD_PATIENT, EDIT_PATIENT } from '../actions/patient';
import { Result } from '../interfaces/result';
import { LOAD_RESULTS, LOAD_TEST_COUNT, LOAD_POSITIVE_COUNT, LOAD_NEGATIVE_COUNT,
  LOAD_POSITIVE_RESULTS, LOAD_NEGATIVE_RESULTS } from '../actions/result';

export interface IAppState {
  users: User[];
  userCount: number;
  patients: Patient[];
  patientCount: 0;
  testCount: number;
  negativeCount: number;
  positiveCount: number;
  positiveResults: Result[];
  negativeResults: Result[];
  results: Result[];
  lastUpdated: Date;
}

export const INITIAL_STATE: IAppState = {
  users: [],
  userCount: 0,
  patients: [],
  patientCount: 0,
  testCount: 0,
  negativeCount: 0,
  positiveCount: 0,
  positiveResults: [],
  negativeResults: [],
  results: [],
  lastUpdated: null
};

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case LOAD_USERS:
      return Object.assign({}, state, {
        users: action.users,
        lastUpdated: new Date(),
      });

    case ADD_USER:
      return Object.assign({}, state, {
        users: state.users.concat(Object.assign({}, action.user)),
        userCount: state.userCount + 1,
        lastUpdated: new Date()
      });

    case LOAD_USER_COUNT:
      return Object.assign({}, state, {
        userCount: action.userCount,
        lastUpdated: new Date()
      });

    case DELETE_USER:
      return Object.assign({}, state, {
        users: state.users.filter(s => s.id !== action.id),
        userCount: state.userCount - 1,
        lastUpdated: new Date()
      });

    case LOAD_PATIENTS:
      return Object.assign({}, state, {
        patients: action.patients,
        lastUpdated: new Date()
      });

    case LOAD_PATIENT_COUNT:
      return Object.assign({}, state, {
        patientCount: action.patientCount,
        lastUpdated: new Date()
      });

    case DELETE_PATIENT:
      return Object.assign({}, state, {
        patients: state.patients.filter(s => s.id !== action.id),
        patientCount: state.patientCount - 1,
        lastUpdated: new Date()
      });

    case ADD_PATIENT:
      return Object.assign({}, state, {
        patients: state.patients.concat(Object.assign({}, action.patient)),
        patientCount: state.patientCount + 1,
        lastUpdated: new Date()
      });

    case EDIT_PATIENT:
      const toDelete = state.patients.findIndex(s => s.id === action.id);
      state.patients.splice(toDelete, 1, action.patient);
      return Object.assign({}, state, {
        patients: state.patients,
        lastUpdated: new Date()
      });

    case LOAD_RESULTS:
      return Object.assign({}, state, {
        results: action.results,
        lastUpdated: new Date()
      });

    case LOAD_POSITIVE_RESULTS:
      return Object.assign({}, state, {
        positiveResults: action.results,
        lastUpdated: new Date()
      });

    case LOAD_NEGATIVE_RESULTS:
      return Object.assign({}, state, {
        negativeResults: action.results,
        lastUpdated: new Date()
      });

    case LOAD_TEST_COUNT:
      return Object.assign({}, state, {
        testCount: action.testCount,
        lastUpdated: new Date()
      });

    case LOAD_POSITIVE_COUNT:
      return Object.assign({}, state, {
        positiveCount: action.positiveCount,
        lastUpdated: new Date()
      });

    case LOAD_NEGATIVE_COUNT:
      return Object.assign({}, state, {
        negativeCount: action.negativeCount,
        lastUpdated: new Date()
      });
  }
  return state;
}
