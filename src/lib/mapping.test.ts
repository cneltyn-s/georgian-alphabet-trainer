import { describe, it, expect } from 'vitest';
import { transliterate, getSourceLetters } from './mapping';

describe('Transliteration Engine', () => {
  it('should transliterate only active letters', () => {
    const input = 'Мама';
    const activeLetters = new Set(['м']);
    const result = transliterate(input, activeLetters);
    
    // Expected: M -> მ (active), а -> а (inactive), м -> მ (active), а -> а (inactive)
    const expectedRendered = 'მаმа'; 
    const actualRendered = result.map(r => r.rendered).join('');
    
    expect(actualRendered).toBe(expectedRendered);
    expect(result[0].isReplaced).toBe(true);
    expect(result[1].isReplaced).toBe(false);
  });

  it('should handle uppercase letters by using lowercase mapping', () => {
    const input = 'М';
    const activeLetters = new Set(['м']);
    const result = transliterate(input, activeLetters);
    
    expect(result[0].rendered).toBe('მ');
    expect(result[0].isReplaced).toBe(true);
  });

  it('should handle complex mappings (e.g. Я -> ia)', () => {
    const input = 'Яблоко';
    const activeLetters = new Set(['я']);
    const result = transliterate(input, activeLetters);
    
    // Я -> ია
    expect(result[0].rendered).toBe('ია');
    expect(result[0].text).toBe('Я');
    expect(result[0].isReplaced).toBe(true);
    
    // Check rest of the word remains Cyrillic
    expect(result[1].rendered).toBe('б');
  });

  it('should ignore punctuation and spaces', () => {
    const input = 'Привет, мир!';
    const activeLetters = new Set(['п', 'м']);
    const result = transliterate(input, activeLetters);
    
    // П -> პ, м -> მ
    // р, и, в, е, т, ,, ' ', и, р, ! -> unchanged
    const rendered = result.map(r => r.rendered).join('');
    expect(rendered).toBe('პривет, მир!');
  });

  it('should handle empty input', () => {
    const input = '';
    const activeLetters = new Set(['а']);
    const result = transliterate(input, activeLetters);
    expect(result).toHaveLength(0);
  });
  
  it('should handle input with no active letters', () => {
    const input = 'Привет';
    const activeLetters = new Set<string>();
    const result = transliterate(input, activeLetters);
    
    const rendered = result.map(r => r.rendered).join('');
    expect(rendered).toBe('Привет');
    expect(result.every(r => !r.isReplaced)).toBe(true);
  });

  it('should return correct source letters for Georgian character', () => {
    // Russian
    const sourcesRu = getSourceLetters('ე', true);
    expect(sourcesRu).toContain('е');
    expect(sourcesRu).toContain('ё');
    expect(sourcesRu).toContain('э');

    // English
    const sourcesEn = getSourceLetters('e', false);
    expect(sourcesEn).toEqual([]); // 'e' is not Georgian
    
    const sourcesEnGeo = getSourceLetters('ე', false);
    expect(sourcesEnGeo).toContain('e');
  });

  it('should return details for complex mappings', () => {
    const sourcesRu = getSourceLetters('შჩ', true);
    expect(sourcesRu).toContain('щ');
    
    const sourcesEn = getSourceLetters('შჩ', false);
    expect(sourcesEn).toContain('shch');
  });
});
