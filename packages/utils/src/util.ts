import { noCase } from 'no-case'
import { StyliPlugin, PluginCategory } from '@styli/types'

export function upFirst(s: string = '') {
  return s.replace(/^[a-z]/, (g) => g.toUpperCase())
}

export function downFirst(s: string = '') {
  return s.replace(/^[A-Z]/, (g) => g.toLowerCase())
}

export function kebab(s: string) {
  return noCase(s).replace(/\s/g, '-')
}

export function isNumber(str: any) {
  return /^-?[0-9.]+$/.test(str)
}

export function isValidPropValue(value: any) {
  return !!value && typeof value !== 'boolean'
}

export function isEmptyObj(props: any) {
  return !props || !Object.keys(props).length
}

export function isPercentNumber(s: string) {
  return /^-?\d+p$/.test(s)
}

export function isPlainType(value: any) {
  const plainTypes = ['number', 'string', 'boolean']
  return plainTypes.includes(typeof value)
}

export function isPlainDirective(key: string) {
  return /^[\dA-Za-z]+(--?([\dA-Za-z])+)*$/.test(key)
}

export function cssKeyToStyleKey(key: string) {
  return /^[A-Z].+$/.test(key) ? '-' + kebab(key) : kebab(key)
}

export function cssObjToStr(style: any, initStr = '') {
  return Object.entries(style).reduce((r, [key, value]) => {
    return r + `${cssKeyToStyleKey(key)}: ${value};`
  }, initStr)
}

export function modifierToProps(modifier: string) {
  return modifier.split(/[\s\t\n]+/).reduce((result, cur) => ({ ...result, [cur]: true }), {})
}

export function classifyPlugins(plugins: StyliPlugin[]): PluginCategory {
  return plugins.reduce(
    (result, cur) => {
      if (cur.onAtomModify) {
        result.atomModifiers.push(cur)
      }
      if (cur.onAtomStyleCreate) {
        result.atomStyleCreations.push(cur)
      }
      if (cur.onStyleCreate) {
        result.styleCreations.push(cur)
      }
      return result
    },
    {
      atomModifiers: [],
      atomStyleCreations: [],
      styleCreations: [],
    } as PluginCategory,
  )
}

export function trimStr(str = '') {
  return str.replace(/\s{2,}/g, ' ').trim()
}

export function getFlexDirection(props: any): string {
  if (props.row) return 'row'
  if (props.column) return 'column'
  if (props.flexDirection) return props.flexDirection
  return 'row'
}
