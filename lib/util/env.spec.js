const { get } = require('./env')
const assert = require('assert')

describe('util env proxy',()=>{

  it('get plguin env',()=>{

    process.env['PLUGIN_XXX'] = '55555'
    assert.equal(
      get('xxx'),
      process.env['PLUGIN_XXX'],
    )
    delete process.env['PLUGIN_XXX']
    
  })

  it('get secret env',()=>{

    let key = 'XXX'
    process.env[key] = '55555'
    assert.equal(
      get('xxx'),
      process.env[key],
    )
    delete process.env[key]
    
  })

  it('get normal env',()=>{

    let key = 'xxx'
    process.env[key] = '55555'
    assert.equal(
      get('xxx'),
      process.env[key],
    )
    delete process.env[key]
    
  })
  
})