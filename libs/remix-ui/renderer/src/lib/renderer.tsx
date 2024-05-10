import React, {useEffect, useState} from 'react' //eslint-disable-line
import { useIntl } from 'react-intl'
import { CopyToClipboard } from '@remix-ui/clipboard'
import { helper } from '@remix-project/remix-solidity'
import './renderer.css'
const _paq = (window._paq = window._paq || [])

interface RendererProps {
  message: any
  opt?: any
  plugin: any
}

export const Renderer = ({ message, opt = {}, plugin }: RendererProps) => {
  const intl = useIntl()
  const [messageText, setMessageText] = useState(null)
  const [editorOptions, setEditorOptions] = useState({
    useSpan: false,
    type: '',
    errFile: ''
  })
  const [classList, setClassList] = useState(opt.type === 'error' ? 'alert alert-danger' : 'alert alert-warning')
  const [close, setClose] = useState(false)

  useEffect(() => {
    if (!message) return
    let text

    if (typeof message === 'string') {
      text = message
    } else if (message.innerText) {
      text = message.innerText
    }

    // ^ e.g:
    // browser/gm.sol: Warning: Source file does not specify required compiler version! Consider adding "pragma solidity ^0.6.12
    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/introspection/IERC1820Registry.sol:3:1: ParserError: Source file requires different compiler version (current compiler is 0.7.4+commit.3f05b770.Emscripten.clang) - note that nightly builds are considered to be strictly less than the released version
    const positionDetails = helper.getPositionDetails(text)

    opt.errLine = positionDetails.errLine
    opt.errCol = positionDetails.errCol
    opt.errFile = positionDetails.errFile ? (positionDetails.errFile as string).trim() : ''

    setMessageText(text)
    setEditorOptions(opt)
    setClose(false)
    setClassList(opt.type === 'error' ? 'alert alert-danger' : 'alert alert-warning')
  }, [message, opt])


  const handleClose = () => {
    setClose(true)
  }


  const askGtp = async () => {
    try {
      const content = await plugin.call('fileManager', 'readFile', editorOptions.errFile)
      const message = intl.formatMessage({ id: 'solidity.openaigptMessage' }, { content, messageText })
      await plugin.call('openaigpt', 'message', message)
      _paq.push(['trackEvent', 'ai', 'openai', 'explainSolidityError'])
    } catch (err) {
      console.error('unable to askGtp')
      console.error(err)
    }
  }

  return (
    <>
      {messageText && !close && (
        <div >

        </div>
      )}
    </>
  )
}
