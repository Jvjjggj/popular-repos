// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {language, changeId, id, isActive} = props

  const addStyle = isActive ? 'add-style' : null

  const onClickIdChange = () => {
    changeId(id)
  }

  return (
    <li className={addStyle}>
      <button onClick={onClickIdChange} className="lang-btn" type="button">
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
