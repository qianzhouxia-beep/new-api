/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'

/**
 * TokenMaster Landing Page Component
 * 
 * This component renders the TokenMaster landing page content
 * while keeping the New API navigation bar (PublicLayout).
 * 
 * Implementation:
 * 1. Load the landing page HTML from /landing/index.html (static file)
 * 2. Inject it into the content area
 * 3. Sync i18n between New API (react-i18next) and TokenMaster (window.I18N)
 * 4. Initialize payment buttons
 */
export function TokenMasterLanding() {
  const { t, i18n } = useTranslation()
  const contentRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load the landing page HTML
    const loadLandingPage = async () => {
      try {
        // Fetch the landing page HTML from the tokenmaster service
        // TODO: Replace with your actual landing page URL or local path
        const response = await fetch('/landing/index.html')
        const html = await response.text()
        
        if (contentRef.current) {
          // Inject the HTML
          contentRef.current.innerHTML = html
          
          // Initialize TokenMaster i18n
          initializeI18n(i18n.language)
          
          // Sync i18n when New API language changes
          i18n.on('languageChanged', (lang: string) => {
            initializeI18n(lang)
          })
          
          setIsLoaded(true)
        }
      } catch (error) {
        console.error('Failed to load landing page:', error)
        // Fallback: show error message
        if (contentRef.current) {
          contentRef.current.innerHTML = `
            <div style="padding: 40px; text-align: center;">
              <h1>Failed to load landing page</h1>
              <p>Please check the console for details.</p>
            </div>
          `
        }
      }
    }

    loadLandingPage()
  }, [i18n])

  if (!isLoaded) {
    return (
      <PublicLayout showMainContainer={false}>
        <main className='flex min-h-screen items-center justify-center'>
          <div className='text-muted-foreground'>{t('Loading...')}</div>
        </main>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout showMainContainer={false}>
      <main className='overflow-x-hidden' ref={contentRef}>
        {/* Content will be injected here */}
      </main>
    </PublicLayout>
  )
}

/**
 * Initialize TokenMaster i18n system
 * Syncs with New API's react-i18next
 */
function initializeI18n(lang: string) {
  const tokenMasterLang = lang.startsWith('zh') ? 'zh' : 'en'
  
  // Call TokenMaster's applyLang function if it exists
  if (window.applyTokenMasterLang) {
    window.applyTokenMasterLang(tokenMasterLang)
  }
  
  // Also try to set it via localStorage (TokenMaster reads this)
  try {
    localStorage.setItem('tm_lang', tokenMasterLang)
  } catch (e) {
    console.error('Failed to set tm_lang:', e)
  }
}

// Extend Window interface to include TokenMaster i18n function
declare global {
  interface Window {
    applyTokenMasterLang?: (lang: string) => void
    I18N?: Record<string, Record<string, string>>
  }
}
