import  Http from '../../../public/modules/http';

const transport = Http();
describe('Api tests', () => {
    it('conflict with registration', (done) => {
        transport.Post('/signup', JSON.stringify({

        }))
            .then(response => {
                expect(response.status).toEqual(400);
                done(true);
            });
    });

    it('conflict wuth authorization', (done) => {
        transport.Post('/signin', JSON.stringify({
            'username': '111',
            'password': 'qwertyqwerty'
        }))
            .then(response => {
                expect(response.status).toEqual(400);
                done(true);
            });
    });

})