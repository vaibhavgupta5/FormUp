type FieldType =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLFormElement

interface FormData {
  names: string[]
  emails: string[]
  addresses: string[]
  cities: string[]
  states: string[]
  countries: string[]
  companies: string[]
  domains: string[]
}

const sampleData: FormData = {
  names: ["John Smith", "Jane Doe", "Michael Johnson", "Sarah Wilson", "David Brown", "Emily Davis", "Chris Taylor", "Amanda Miller"],
  emails: ["user", "test", "demo", "sample", "example", "admin", "contact"],
  addresses: ["123 Main St", "456 Oak Ave", "789 Pine Rd", "321 Elm Dr", "654 Maple Ln", "987 Cedar Blvd"],
  cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"],
  states: ["NY", "CA", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI"],
  countries: ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan"],
  companies: ["Tech Corp", "Global Industries", "Innovation Labs", "Digital Solutions", "Future Systems", "Smart Enterprises"],
  domains: ["example.com", "test.org", "demo.net", "sample.co", "placeholder.io"]
}

const randomText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."

const getRandomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

const generatePhoneNumber = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100 // 100-999
  const centralOfficeCode = Math.floor(Math.random() * 900) + 100 // 100-999
  const lineNumber = Math.floor(Math.random() * 9000) + 1000 // 1000-9999
  return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`
}

const generateEmail = (): string => {
  const username = getRandomItem(sampleData.emails)
  const number = Math.floor(Math.random() * 1000)
  const domain = getRandomItem(sampleData.domains)
  return `${username}${number}@${domain}`
}

const generateRandomDate = (yearsBack: number = 30): string => {
  const today = new Date()
  const pastDate = new Date(today.getFullYear() - yearsBack, 0, 1)
  const randomTime = pastDate.getTime() + Math.random() * (today.getTime() - pastDate.getTime())
  const randomDate = new Date(randomTime)
  
  const year = randomDate.getFullYear()
  const month = String(randomDate.getMonth() + 1).padStart(2, '0')
  const day = String(randomDate.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

const generateRandomTime = (): string => {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0')
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0')
  return `${hours}:${minutes}`
}

const generateZipCode = (): string => {
  return String(Math.floor(Math.random() * 90000) + 10000)
}

const generateRandomText = (minWords: number = 3, maxWords: number = 10): string => {
  const words = randomText.split(" ")
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
  const start = Math.floor(Math.random() * (words.length - wordCount))
  return words.slice(start, start + wordCount).join(" ")
}

const getFieldIntent = (field: HTMLElement): string => {
  const attributes = [
    field.getAttribute('name'),
    field.getAttribute('id'),
    field.getAttribute('placeholder'),
    field.getAttribute('class'),
    field.getAttribute('data-testid'),
    field.getAttribute('aria-label')
  ].filter(Boolean).join(' ').toLowerCase()

  if (attributes.includes('email') || attributes.includes('e-mail')) return 'email'
  if (attributes.includes('phone') || attributes.includes('tel') || attributes.includes('mobile')) return 'phone'
  if (attributes.includes('name') && !attributes.includes('user')) return 'name'
  if (attributes.includes('first') && attributes.includes('name')) return 'firstName'
  if (attributes.includes('last') && attributes.includes('name')) return 'lastName'
  if (attributes.includes('address') || attributes.includes('street')) return 'address'
  if (attributes.includes('city')) return 'city'
  if (attributes.includes('state')) return 'state'
  if (attributes.includes('zip') || attributes.includes('postal')) return 'zip'
  if (attributes.includes('country')) return 'country'
  if (attributes.includes('company') || attributes.includes('organization')) return 'company'
  if (attributes.includes('age')) return 'age'
  if (attributes.includes('birth') || attributes.includes('dob')) return 'birthdate'
  if (attributes.includes('website') || attributes.includes('url')) return 'url'
  if (attributes.includes('comment') || attributes.includes('message') || attributes.includes('description')) return 'longText'

  return 'default'
}

const fillField = (field: FieldType): void => {
  try {
    if (field.hasAttribute('disabled') || field.hasAttribute('readonly')) {
      console.log('Skipping disabled/readonly field:', field)
      return
    }

    if (field instanceof HTMLInputElement && (field.type === 'checkbox' || field.type === 'radio')) {
      field.checked = Math.random() < 0.6 
      field.dispatchEvent(new Event('change', { bubbles: true }))
      console.log(`Updated ${field.type} field:`, field.checked)
      return
    }

    if (field instanceof HTMLSelectElement) {
      const options = Array.from(field.options).filter(option => option.value !== '')
      if (options.length > 0) {
        const randomOption = getRandomItem(options)
        field.value = randomOption.value
        field.dispatchEvent(new Event('change', { bubbles: true }))
        console.log('Updated select field with value:', field.value)
      }
      return
    }

    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      const fieldType = field instanceof HTMLInputElement ? field.type : 'textarea'
      const intent = getFieldIntent(field)
      let value = ''

      switch (fieldType) {
        case 'email':
          value = generateEmail()
          break
        case 'tel':
        case 'phone':
          value = generatePhoneNumber()
          break
        case 'number':
          const min = parseInt(field.getAttribute('min') || '0')
          const max = parseInt(field.getAttribute('max') || '100')
          value = String(Math.floor(Math.random() * (max - min + 1)) + min)
          break
        case 'range':
          const rangeMin = parseInt(field.getAttribute('min') || '0')
          const rangeMax = parseInt(field.getAttribute('max') || '100')
          value = String(Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin)
          break
        case 'date':
          value = generateRandomDate()
          break
        case 'datetime-local':
          value = `${generateRandomDate()}T${generateRandomTime()}`
          break
        case 'time':
          value = generateRandomTime()
          break
        case 'month':
          const year = new Date().getFullYear()
          const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
          value = `${year}-${month}`
          break
        case 'week':
          const weekYear = new Date().getFullYear()
          const week = String(Math.floor(Math.random() * 52) + 1).padStart(2, '0')
          value = `${weekYear}-W${week}`
          break
        case 'color':
          value = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
          break
        case 'password':
          value = 'Password123!'
          break
        case 'url':
          value = `https://www.${getRandomItem(sampleData.domains)}`
          break
        case 'search':
          value = generateRandomText(1, 3)
          break
        case 'textarea':
          value = generateRandomText(10, 50)
          break
        case 'file':
          console.log('Skipping file input:', field)
          return
        case 'hidden':
          console.log('Skipping hidden input:', field)
          return
        default:
          switch (intent) {
            case 'email':
              value = generateEmail()
              break
            case 'phone':
              value = generatePhoneNumber()
              break
            case 'name':
              value = getRandomItem(sampleData.names)
              break
            case 'firstName':
              value = getRandomItem(sampleData.names).split(' ')[0]
              break
            case 'lastName':
              value = getRandomItem(sampleData.names).split(' ')[1] || 'Smith'
              break
            case 'address':
              value = getRandomItem(sampleData.addresses)
              break
            case 'city':
              value = getRandomItem(sampleData.cities)
              break
            case 'state':
              value = getRandomItem(sampleData.states)
              break
            case 'zip':
              value = generateZipCode()
              break
            case 'country':
              value = getRandomItem(sampleData.countries)
              break
            case 'company':
              value = getRandomItem(sampleData.companies)
              break
            case 'age':
              value = String(Math.floor(Math.random() * 50) + 18)
              break
            case 'birthdate':
              value = generateRandomDate(50)
              break
            case 'url':
              value = `https://www.${getRandomItem(sampleData.domains)}`
              break
            case 'longText':
              value = generateRandomText(15, 100)
              break
            default:
              value = generateRandomText()
              break
          }
      }

      field.value = value
      
      field.dispatchEvent(new Event('input', { bubbles: true }))
      field.dispatchEvent(new Event('change', { bubbles: true }))
      field.dispatchEvent(new Event('blur', { bubbles: true }))
      
      console.log(`Updated ${fieldType} field (${intent}) with value:`, value)
    }
  } catch (error) {
    console.error('Error filling field:', error, field)
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SCRAPE_DATA") {
    try {
      const fields = document.querySelectorAll(`
        input:not([type="submit"]):not([type="button"]):not([type="reset"]),
        select,
        textarea
      `)

      console.log(`Found ${fields.length} form fields`)

      if (!fields || fields.length === 0) {
        console.error("No form fields found on the page.")
        sendResponse({ data: "No form fields found" })
        return
      }

      let filledCount = 0
      
      Array.from(fields).forEach((field: Element) => {
        if (field instanceof HTMLInputElement || 
            field instanceof HTMLSelectElement || 
            field instanceof HTMLTextAreaElement) {
          
          const style = window.getComputedStyle(field)
          if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
            fillField(field)
            filledCount++
          } else {
            console.log('Skipping hidden field:', field)
          }
        }
      })

      setTimeout(() => {
        const firstVisibleField = Array.from(fields).find(field => {
          const style = window.getComputedStyle(field as Element)
          return style.display !== 'none' && style.visibility !== 'hidden'
        }) as HTMLElement
        
        if (firstVisibleField) {
          firstVisibleField.focus()
        }
      }, 100)

      sendResponse({ 
        data: `Form filled successfully! Populated ${filledCount} out of ${fields.length} fields.` 
      })
      
    } catch (error) {
      console.error('Error in form filling:', error)
      sendResponse({ data: `Error filling form: ${error.message}` })
    }
    
    return true
  }
})

export const config = {
  matches: ["<all_urls>"],
  run_at: "document_end"
}