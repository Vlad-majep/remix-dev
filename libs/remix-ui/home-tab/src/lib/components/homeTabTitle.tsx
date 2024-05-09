/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import React, { useEffect, useState, useRef, useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { CustomTooltip } from '@remix-ui/helper'
const _paq = (window._paq = window._paq || []) // eslint-disable-line

function HomeTabTitle() {
  useEffect(() => {
    document.addEventListener('keyup', (e) => handleSearchKeyDown(e))
    return () => {
      document.removeEventListener('keyup', handleSearchKeyDown)
    }
  }, [])
  const [state, setState] = useState<{
    searchDisable: boolean
  }>({
    searchDisable: true
  })

  const searchInputRef = useRef(null)
  const remiAudioEl = useRef(null)
  const intl = useIntl()

  const playRemi = async () => {
    remiAudioEl.current.play()
  }
  const handleSearchKeyDown = (e: KeyboardEvent) => {
    if (e.target !== searchInputRef.current) return
    if (e.key === 'Enter') {
      _paq.push(['trackEvent', 'hometab', 'header', 'searchDocumentation'])
      openLink()
      searchInputRef.current.value = ''
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          searchDisable: searchInputRef.current.value === ''
        }
      })
    }
  }

  const openLink = (url = '') => {
    if (url === '') {
      window.open('https://remix-ide.readthedocs.io/en/latest/search.html?q=' + searchInputRef.current.value + '&check_keywords=yes&area=default', '_blank')
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="px-2 pb-2 pt-2 d-flex flex-column border-bottom" id="hTTitleSection">
      <div className="d-flex py-2 justify-content-between">
        <div className="d-flex justify-content-start">
          <span className="h-80 text-uppercase" style={{ fontSize: 'xx-large', fontFamily: 'Noah, sans-serif' }}>
            Remix
          </span>
          <div className="ml-2 d-flex">
            <div onClick={() => playRemi()}>
              <img className="" src="assets/img/guitarRemiCroped.webp" style={{ height: '3rem' }} alt=""></img>
            </div>
            <audio id="remiAudio" muted={false} src="assets/audio/remiGuitar-single-power-chord-A-minor.mp3" ref={remiAudioEl}></audio>
          </div>
        </div>
      </div>
      <b className="py-1 text-dark" style={{ fontStyle: 'italic' }}>
        <FormattedMessage id="home.nativeIDE" />
      </b>

    </div>
  )
}

export default HomeTabTitle
