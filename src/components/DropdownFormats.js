import React, { useState, useEffect, useRef } from 'react'

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  )
}

const CloseIcon = () => {
  return (
      <svg height="20" width="20" viewBox="0 0 20 20">
          <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
      </svg>
  )
}

// isMulti = multiselect
// Sen sisään on rakennettu muitakin ominaisuuksia, esim. tägit ja filtteröinti setNamen mukaan erillisen haun ulkopuolelle.
// Tässä komponentissa multiselect EI ole käytössä. DropdownMulti.js -> multiselectiin.
const Dropdown = ({ newId, setNewId, newFormatName, setNewFormatName, selected, setSelected,  placeHolder, options, isMulti, isSearchable, onChange }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null)
    const [searchValue, setSearchValue] = useState("")
    const searchRef = useRef()

    useEffect(() => {
      setSearchValue("")
      if (showMenu && searchRef.current) {
          searchRef.current.focus()
      }
    }, [showMenu])

    useEffect(() => {
        const handler = () => setShowMenu(false)

        window.addEventListener("click", handler)
        return () => {
            window.removeEventListener("click", handler)
        }
    })
    const handleInputClick = (e) => {
        e.stopPropagation()
        setShowMenu(!showMenu)        
    }

    const onSearch = (e) => {
      setSearchValue(e.target.value)
      // console.log("searchValue: ", searchValue)
    }
    const getOptions = () => {
      if (!searchValue) {
          return options
      }
      // Hakee mistä tahansa kohtaa haettavista hakukriteerit täyttäviä optioita
      return options.filter((option) => option.formatName.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0)
      // Hakee hakukohteiden alusta hakusanat täyttäviä kohteita
      // return options.filter((option) => option.label.toLowerCase().indexOf(searchValue.toLowerCase()) === 0
    }

    // Tämä oli multiselectin tilalla aiemmin:
    // const getDisplay = () => {
    //     if (selectedValue) {
    //         return selectedValue.label
    //     }
    //     return placeHolder
    // }

    // Multiselect -update ylläolevaan:
    // Mitä dropdownissa näytetään: placeholder vai valinnat.
    const getDisplay = () => {
      if (!selectedValue || selectedValue.length === 0) {
          return placeHolder
      }
      if (isMulti) {
          return (
              <div className="dropdown-tags">
                  {selectedValue.map((option) => (
                      <div key={option.formatId} className="dropdown-tag-item">
                          {option.formatName}
                          <span onClick={(e) => onTagRemove(e, option)} className="dropdown-tag-close"><CloseIcon /></span>
                      </div>
                  ))}
              </div>
          )
      }
      return selectedValue.name
    }
    const removeOption = (option) => {
      return selectedValue.filter((o) => o.formatId !== option.formatId)
    }
    const onTagRemove = (e, option) => {
      e.stopPropagation()
      const newValue = removeOption(option)
      // setSelectedValue(removeOption(option)) // Tämä on kommentoitu pois jo alkuperäisestä, ennen multiselectiä. Voinee poistaa.
      setSelected(newValue)      
      // console.log("@ REMOVED selected:", selected)
      
      if (newValue === []) {
        var noId = ([])
        setNewId(noId) // Tämä state palautuu parentille, joka pitäisi saada päivittymään input-valueen 
        // console.log("ID - NO ID", newId)
        setNewFormatName(noId)
      }
      
      setSelectedValue(newValue)
      onChange(newValue)
    }

    // Tämä oli multiselectin tilalla aiemmin:
    // const onItemClick = (option) => {
    //     setSelectedValue(option)
    // }

    // Multiselect yllä olevan tilalle:
    const onItemClick = (option) => {
      let newValue
      if (isMulti) {
          if (selectedValue.findIndex((o) => o.formatId === option.formatId) >= 0) {
              newValue = removeOption(option)
          } else { // Vaihtamalla kommentoidun rivin alemman tilalle, saa multiselectin käyttöön. Nyt valitsee tai poistaa yhden.
              // newValue = [...selectedValue, option]
              newValue = [option]              
          }
      } else {
          newValue = option
      }
      setSelected(newValue) // Tämä state palautuu parentille ("asetettu commander" - tarvitaanko debuggaamisen jälkeen?)
      // console.log("@ selected:", selected)
      const selectedId = selected.map((s) => s.formatId)
      setNewId(selectedId) // Tämä state palautuu parentille
      // console.log("ID - newId:", newId)
      const selectedFormat = selected.map((s) => s.formatName)
      setNewFormatName(selectedFormat) // Tämä state palautuu parentille    

      setSelectedValue(newValue)        
      onChange(newValue)
    }

    // Tämä oli ennen multiselectiä:
    // const isSelected = (option) => {
    //     if (!selectedValue) {
    //         return false
    //     }        
    //     return selectedValue.value === option.value
    // }

    // Tämä multiselectin myötä:
    const isSelected = (option) => {
      if (isMulti) {
          return selectedValue.filter((o) => o.formatId === option.formatId).length > 0
      }
      if (!selectedValue) {
          return false
      }
      return selectedValue.formatId === option.formatId      
    }

    // Yritys lähettää child -> parent
    // const state = {
    //   example: 'Tämä viesti tulee perille'
    // }
    // Tämä toimii. Vaatii <input onInput={handleCallback}>
    // const handleCallback = () => callback(selectedValue)

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
      <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
        {showMenu && (
            <div className="dropdown-menu">
            {isSearchable && (
              <div className="search-box">
                <label>Filter by format:</label>
                <input onChange={onSearch} value={searchValue} ref={searchRef} />
              </div>
            )}
            {getOptions().map((option) => (
              <div
                  onClick={() => onItemClick(option)}
                  key={option.formatId}
                  className={`dropdown-item ${isSelected(option) && "selected"}`}
              >
                  {option.formatName}
              </div>
            ))}
        </div>
        )}        
      </div>
    </div>
  )
}

export default Dropdown