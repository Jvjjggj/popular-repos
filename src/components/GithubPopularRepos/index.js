import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const constants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  failed: 'FAILED',
  success: 'SUCCESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    upiStatus: constants.initial,
    langaugeId: languageFiltersData[0].id,
    repos: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {langaugeId} = this.state
    this.setState({upiStatus: constants.inprogress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${langaugeId}`,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.popular_repos.map(i => ({
        avatarUrl: i.avatar_url,
        forksCount: i.forks_count,
        id: i.id,
        name: i.name,
        issuesCount: i.issues_count,
        starsCount: i.stars_count,
      }))
      this.setState({upiStatus: constants.success, repos: updatedData})
    } else {
      this.setState({upiStatus: constants.failed})
    }
  }

  getSuccessVeiw = () => {
    const {repos} = this.state
    return (
      <ul className="reposList">
        {repos.map(i => (
          <RepositoryItem key={i.id} details={i} />
        ))}
      </ul>
    )
  }

  getLoadingVeiw = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getFailedVeiw = () => {
    const {repos} = this.state
    console.log(repos)
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
      </div>
    )
  }

  getResultsOfId = () => {
    const {upiStatus} = this.state

    switch (upiStatus) {
      case constants.failed:
        return this.getFailedVeiw()

      case constants.inprogress:
        return this.getLoadingVeiw()

      case constants.success:
        return this.getSuccessVeiw()

      default:
        return null
    }
  }

  changeLanguageId = async id => {
    await this.setState({langaugeId: id})
    this.getProducts()
  }

  languagesList = () => {
    const {langaugeId} = this.state

    return (
      <ul className="unorder-list">
        {languageFiltersData.map(i => (
          <LanguageFilterItem
            key={i.id}
            isActive={langaugeId === i.id}
            changeId={this.changeLanguageId}
            language={i.language}
            id={i.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <h1 className="heading">Popular</h1>
        {this.languagesList()}
        {this.getResultsOfId()}
      </div>
    )
  }
}
export default GithubPopularRepos
