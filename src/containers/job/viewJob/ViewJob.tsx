import { FC, useCallback, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-toastify'

import Header from '../../../components/shared/header/Header.component'
import Grid from '../../../components/layout/grid/Grid.component'
import Button from '../../../components/core/button/Button.component'
import Text from '../../../components/core/text/Text.component'
import StatusLabel from '../../../components/shared/statusLabel/StatusLabel.component'
import { IJob } from '../searchJob/SearchJob.types'
import { applyToJob } from '../../../features/jobs/JobsAction'
import { checkValueExits } from '../../../utils/CommonFunctions.utils'

import ViewJobWrapper from './ViewJob.theme'

const ViewJobScreen: FC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const { jobId } = params
  const { jobList, appliedJobs } = useSelector((state: any) => state.jobs)

  const initialJobDetails = {
    Guid: '',
    Title: '',
    Description: '',
    Location: '',
    Published: '',
    Company: '',
    Url: '',
  }

  const [jobDetails, setJobDetails] = useState<IJob>(initialJobDetails)

  const postedDay = moment(jobDetails?.Published).format('DD MMM YYYY')
  const isApplied = checkValueExits(jobId as string, appliedJobs)

  const handleBackNavigation = useCallback(() => {
    navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyToJob = useCallback(() => {
    dispatch(applyToJob(jobId as string))
    toast.success('You are applied to the job successfully.', { autoClose: 1500 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const selectedJob = jobList?.filter((job: IJob) => job.Guid === jobId)
    setJobDetails(selectedJob?.[0])
  }, [jobList, jobId])

  return (
    <ViewJobWrapper data-test="view-job-wrapper">
      <Header data-test="view-job-header" />
      <Grid className="viewJob__main" direction="column">
        <Grid className="viewJob__Inner" direction="column">
          <Button
            startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            className="button__back--transparent"
            backgroundColor="transparent"
            hoverColor="transparent"
            onClick={handleBackNavigation}
            data-test="view-job-back-navigation"
          />
          <Grid direction="row" className="job__header">
            <Grid direction="column" className="job__innerHeader">
              <Text size="l" weight="medium" margin="0 2rem 0.4rem 0" data-test="view-job-title">
                {jobDetails?.Title}
              </Text>
              <Text margin="0 0 0.4rem 0" className="job__Link" data-test="view-job-company">
                <a href={jobDetails?.Url} target="_blank" rel="noreferrer">
                  {jobDetails?.Company}
                </a>
              </Text>
              <Text
                margin="0 0 0.4rem 0"
                className="job__locationIcon"
                data-test="view-job-location"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} data-test="view-job-location-icon" />
                {jobDetails?.Location}
              </Text>
              <Text size="xxs" margin="0 0 0.4rem 0" data-test="view-job-posted-day">
                {postedDay}
              </Text>
              <Text
                size="xxs"
                color="typo-label"
                weight="bold"
                className="job__label"
                data-test="view-job-type"
              >
                Full-time
              </Text>
            </Grid>
            <Grid width="auto" padding="2rem 0 0 0" className="job__apply">
              {isApplied ? (
                <StatusLabel
                  label="Applied"
                  className="job__status"
                  data-test="view-job-applied-label"
                />
              ) : (
                <Button
                  type="submit"
                  width="12rem"
                  height="4.5rem"
                  onClick={handleApplyToJob}
                  data-test="view-job-apply-button"
                >
                  <Text size="m" color="typo-white">
                    Apply
                  </Text>
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid className="job__description" direction="column">
            <span
              dangerouslySetInnerHTML={{ __html: jobDetails?.Description }}
              className="card__description"
            />
          </Grid>
          <Grid width="auto" padding="4rem 0 0 0" justifyContent="center">
            {!isApplied && (
              <Button
                type="submit"
                width="12rem"
                height="4.5rem"
                onClick={handleApplyToJob}
                data-test="view-job-apply-button"
              >
                <Text size="m" color="typo-white">
                  Apply
                </Text>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ViewJobWrapper>
  )
}

export default ViewJobScreen
