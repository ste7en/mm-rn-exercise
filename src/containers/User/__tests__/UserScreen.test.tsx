import React from 'react'

import { wrappedRender } from '@/utils/e2e'

describe('', () => {
  it('should render a placeholder if no user is logged in', () => {
    wrappedRender(<></>)
  })
})
