import { styli } from '@styli/core'
import { StyliPlugin } from '@styli/types'
import { isValidPropValue } from '@styli/utils'

function isPreset(key: string) {
  return /^text(xs|sm|base|lg|[2-9]?xl)$/i.test(key)
}
export function isMatch(key: string) {
  return /^text(-.+)?$/.test(key) || isPreset(key)
}

export function textSizePropToStyle(prop: string, propValue: any) {
  if (isValidPropValue(propValue)) {
    return { fontSize: styli.getValue(propValue) }
  }

  if (isPreset(prop)) {
    const fontSize = styli.getTheme('fontSize')
    const key = prop.replace(/^text/, '').toLowerCase()
    return { fontSize: fontSize[key] }
  }

  const [, value] = prop.split('-')

  return { fontSize: styli.getValue(value) }
}

export default (): StyliPlugin => {
  return {
    name: 'styli-plugin-text-size',
    isMatch,
    onAtomStyleCreate(atom) {
      atom.style = textSizePropToStyle(atom.propKey, atom.propValue)
      return atom
    },
  }
}
