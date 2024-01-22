// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {avatarUrl, name, issuesCount, forksCount, starsCount} = details
  return (
    <li className="repos-details">
      <img className="avatarUrl" src={avatarUrl} alt={name} />
      <h1 className="name-hheading">{name}</h1>
      <div className="star-container">
        <img
          className="star-img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="paraa">{starsCount} stars</p>
      </div>
      <div className="star-container">
        <img
          className="star-img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="paraa">{forksCount} forks</p>
      </div>
      <div className="star-container">
        <img
          className="star-img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="paraa">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
