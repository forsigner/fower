import { Atom, SheetType } from '@styli/types'
import plugin from '../src'

describe('styli-plugin-flex-box', () => {
  const { onAtomStyleCreate } = plugin()
  const sheet = {} as SheetType

  it('onAtomStyleCreate', () => {
    const atom1 = { propKey: 'column', propValue: true } as Atom
    const newAtom1 = {
      propKey: 'column',
      propValue: true,
      style: {},
    }
    expect(onAtomStyleCreate!(atom1, sheet)).toMatchObject(newAtom1)

    const atom2 = { propKey: 'flexWrap', propValue: 'wrap' } as Atom
    const newAtom2 = { propKey: 'flexWrap', propValue: 'wrap', style: { flexWrap: 'wrap' } }
    expect(onAtomStyleCreate!(atom2, sheet)).toMatchObject(newAtom2)
  })
})
