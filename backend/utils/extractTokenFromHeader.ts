const extractTokenFromHeaders = (cookiesHeader: string, tokenType: 'access-token' | 'refresh-token') => {
    let token = ''

    const cookie = cookiesHeader.split('; ')

    cookie.map(currCookie => {
        const [key,value] = currCookie.split('=')

        if(key === tokenType) token = value
    })
    console.log(token)

    return token
}

export default extractTokenFromHeaders