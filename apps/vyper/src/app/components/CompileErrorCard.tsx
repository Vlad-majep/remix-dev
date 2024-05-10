import {CopyToClipboard} from '@remix-ui/clipboard'
import Reaact from 'react'
import { RemixClient } from '../utils'

export function CompileErrorCard(props: { output: any, plugin: RemixClient }) {
  return (
    <div
      id="vyperErrorResult"
      className=" d-flex flex-column p-2 alert alert-danger error vyper-compile-error vyper-panel-width"
    >
      <span
        data-id="error-message"
        className="text-left"
        style={{
          overflowX: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {props.output.message.trim()}
      </span>
      <div className="d-flex flex-column pt-3 align-items-end mb-2">
      </div>
    </div>
  )
}
