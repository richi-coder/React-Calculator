import { describe, expect, it } from "vitest"
import { calculation } from "../src/calculation"

describe('first', () => { 
    
    it('adding to numbers', () => {
        expect(calculation('1+2=')).toBe('1+2=3')
    })

    it('four different operations with integers', () => {
        expect(calculation('-5+4/3*-2=')).toBe('-5+4/3*-2=-7.6667')
    })

    it('complex calculation with decimals', () => {
        expect(calculation('5.11*4.51/-2.18+1.15/-7*89.18+596.8513=')).toBe('5.11*4.51/-2.18+1.15/-7*89.18+596.8513=571.6287')
    })

    it('operating in any order', () => {
        expect(calculation('5*8/5+8-5*-8/-5+5=')).toBe('5*8/5+8-5*-8/-5+5=13')
    })

 })