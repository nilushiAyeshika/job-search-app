import {
  GET_JOBS,
  GET_JOBS_SUCCESS,
  GET_JOBS_ERROR,
  CLEAR_SEARCH_RESULTS,
  APPLY_TO_JOB,
  JobsDispatchTypes
} from './JobsAction.types'
import { IJobsDefaultState } from './JobsReducer.types'

const defaultState: IJobsDefaultState = {
  jobList: undefined,
  isLoading: false,
  searchOptions: {
    queryString: '',
    location: '',
  },
  appliedJobs: [],
}

const JobsReducer = (
  state: IJobsDefaultState = defaultState,
  action: JobsDispatchTypes
): IJobsDefaultState => {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        isLoading: true,
        searchOptions: {
          queryString: action.payload.searchOptions.queryString,
          location: action.payload.searchOptions.location,
        },
        jobList: undefined,
      }
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobList: action.payload.jobList,
      }
    case GET_JOBS_ERROR:
      return {
        ...state,
        isLoading: false,
        jobList: undefined,
      }
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        isLoading: false,
        jobList: undefined,
        searchOptions: {
          queryString: '',
          location: '',
        },
      }
    case APPLY_TO_JOB:
      return {
        ...state,
        appliedJobs: [...state.appliedJobs, action.payload]
      }
    default:
      return state
  }
}

export default JobsReducer