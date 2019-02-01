const baseUrl = 'http://localhost'
const port = ''
export default class Config{
    static baseUrl(){
        return `${baseUrl}${port}`
    }
}