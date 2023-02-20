import { AxiosError } from 'axios'

export const onFormError = (
  error: AxiosError<RescourceError>,
  fn: (errors: RescourceError) => void
) => {
  if (error.response?.status === 422) {
    fn(error.response.data)
  }
  throw error
}
