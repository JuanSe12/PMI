const baseUrl = 'http://localhost'
const port = ':8080'
export default class Config{
    static baseUrl(){
        return `${baseUrl}${port}`
    }
}