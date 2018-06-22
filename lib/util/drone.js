const { env } = require('./')

/**
 * @typedef { 'failure'|'success' } BUILD_STATUS
 * @typedef { 'push' | 'pull_request' | 'tag' } BUILD_EVENT
 */

module.exports = new Proxy({
  /**environment architecture (linux/amd64) */
  arch: '',
  /**repository full name */
  repo: '',
  /**repository owner */
  repo_owner: '',
  /**repository name */
  repo_name: '',
  /**repository scm (git) */
  repo_scm: '',
  /**repository link */
  repo_link: '',
  /**repository avatar */
  repo_avatar: '',
  /**repository default branch (master) */
  repo_branch: '',
  /**repository is private */
  repo_private: '',
  /**repository is trusted */
  repo_trusted: '',
  /**repository clone url */
  remote_url: '',
  /**commit sha */
  commit_sha: '',
  /**commit ref */
  commit_ref: '',
  /**commit branch */
  commit_branch: '',
  /**commit link in remote */
  commit_link: '',
  /**commit message */
  commit_message: '',
  /**commit author username */
  commit_author: '',
  /**commit author email address */
  commit_author_email: '',
  /**commit author avatar */
  commit_author_avatar: '',
  /**build number */
  build_number: '',
  /**build event (push, pull_request, tag) */
  build_event: /**@type {BUILD_EVENT} */(''),
  /**build status (success, failure) */
  build_status: /**@type {BUILD_STATUS} */(''),
  /**build result link */
  build_link: '',
  /**build created unix timestamp */
  build_created: '',
  /**build started unix timestamp */
  build_started: '',
  /**build finished unix timestamp */
  build_finished: '',
  /**prior build status */
  prev_build_status: /**@type {BUILD_STATUS} */(''),
  /**prior build number */
  prev_build_number: '',
  /**prior build commit sha */
  prev_commit_sha: '',
  /**job number */
  job_number: '',
  /**job status */
  job_status: '',
  /**job started */
  job_started: '',
  /**job finished */
  job_finished: '',
  /**commit branch */
  branch: '',
  /**commit sha */
  commit: '',
  /**commit tag */
  tag: '',
  /**pull request number */
  pull_request: '',
  /**deployment target (ie production) */
  deploy_to: '',
},{
  /**@param {string} key */
  get(target,key){ return env.get(('DRONE_'+key).toUpperCase()) }
})