import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', ()=> {
    it('testing for fractional dollars', ()=>{
        expect(formatMoney(1)).toEqual('$0.01');
        expect(formatMoney(10)).toEqual('$0.10');
        expect(formatMoney(25)).toEqual('$0.25');
        expect(formatMoney(6)).toEqual('$0.06');
        expect(formatMoney(99)).toEqual('$0.99');
    });
    it('testing whole dollar amounts', ()=>{
        expect(formatMoney(100)).toEqual('$1.00');
        expect(formatMoney(9900)).toEqual('$99.00');
        expect(formatMoney(7500)).toEqual('$75.00');
        expect(formatMoney(12500)).toEqual('$125.00');
        expect(formatMoney(4400)).toEqual('$44.00');
    });
    it('additiona test for mixed money', ()=>{
        expect(formatMoney(199)).toEqual('$1.99');
        expect(formatMoney(9910)).toEqual('$99.10');
        expect(formatMoney(7501)).toEqual('$75.01');
        expect(formatMoney(12525)).toEqual('$125.25');
        expect(formatMoney(4402)).toEqual('$44.02');
        expect(formatMoney(114402)).toEqual('$1,144.02');
    });

})