import tsConfigPaths from 'tsconfig-paths'
import tsConfig from './tsconfig.json'

const baseUrl = './dist'

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
})
