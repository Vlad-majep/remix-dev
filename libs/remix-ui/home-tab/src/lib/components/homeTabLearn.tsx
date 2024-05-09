/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { ThemeContext } from '../themeContext'
import { CustomTooltip } from '@remix-ui/helper'
declare global {
  interface Window {
    _paq: any
  }
}
const _paq = (window._paq = window._paq || []) //eslint-disable-line

enum VisibleTutorial {
  Basics,
  Intermediate,
  Advanced
}
interface HomeTabLearnProps {
  plugin: any
}

function HomeTabLearn({ plugin }: HomeTabLearnProps) {
  const [state, setState] = useState<{
    visibleTutorial: VisibleTutorial
  }>({
    visibleTutorial: VisibleTutorial.Basics
  })

  const themeFilter = useContext(ThemeContext)

  const startLearnEthTutorial = async (tutorial: 'basics' | 'soliditybeginner' | 'deploylibraries') => {
    await plugin.appManager.activatePlugin(['solidity', 'LearnEth', 'solidityUnitTesting'])
    plugin.verticalIcons.select('LearnEth')
    plugin.call('LearnEth', 'startTutorial', 'ethereum/remix-workshops', 'master', tutorial)
    _paq.push(['trackEvent', 'hometab', 'startLearnEthTutorial', tutorial])
  }

  const goToLearnEthHome = async () => {
    if (await plugin.appManager.isActive('LearnEth')) {
      plugin.verticalIcons.select('LearnEth')
      await plugin.call('LearnEth', 'home')
    } else {
      await plugin.appManager.activatePlugin(['LearnEth', 'solidity', 'solidityUnitTesting'])
      plugin.verticalIcons.select('LearnEth')
      await plugin.call('LearnEth', 'home')
    }
  }

  return (
    <div className="d-flex px-2 pb-2 pt-2 d-flex flex-column" id="hTLearnSection">

    </div>
  )
}

export default HomeTabLearn
