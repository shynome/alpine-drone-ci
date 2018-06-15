const { getEnv } = require('./preset_env')
exports.drone = new Proxy({
  REPO_NAME:'',
  BUILD_NUMBER:'',
  REPO:'',
  REPO_LINK:'',
  COMMIT_SHA:'',
  COMMIT_LINK:'',
  BUILD_LINK:'',
  BUILD_EVENT:'',
  BUILD_STATUS:/**@type {'failure'|'success'} */(''),
  BUILD_CREATED: '',
  BUILD_STARTED: '',
  BUILD_FINISHED: '',
  COMMIT_MESSAGE: '',
  COMMIT_BRANCH: '',
  COMMIT_AUTHOR: '',
},{
  /**@param {string} key */
  get(target,key){ return getEnv(('DRONE_'+key).toUpperCase()) }
})