import { useState } from 'react'
import { FeedbackAlertProps } from '../types'
import { RenderIf } from '@remix-ui/helper'
import {CopyToClipboard} from '@remix-ui/clipboard'

export function FeedbackAlert ({ message, askGPT }: FeedbackAlertProps) {
  const [ showAlert, setShowAlert] = useState<boolean>(true)

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <RenderIf condition={showAlert}>
      <>
      </>
    </RenderIf>
  )
}
